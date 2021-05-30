<template>
  <div>
    <div class="columns">
      <SurveyMenu :survey-id="surveyId" />

      <div
        class="column is-four-fifths"
        style="background: #fff; min-height: 100vh; padding: 24px;"
      >
        <section style="margin-bottom: 24px;">
          <div style="display: flex">
            <div class="title can-edit">
              {{ surveyTitle }}
            </div>
            <div @click="editTitle" title="Click to edit the title">
              <b-icon
                class="item-box-actions--item"
                icon="pencil-alt"
                size="is-small"
                style="margin-left: 8px; margin-top: 8px; cursor: pointer; color: gray;"
              >
              </b-icon>
            </div>
          </div>

          <div>
            <div v-if="surveyDescription">
              <div style="display: flex">
                <div>
                  {{ surveyDescription }}
                </div>
                <div
                  @click="editDescription"
                  title="Click to edit the description"
                >
                  <b-icon
                    class="item-box-actions--item"
                    icon="pencil-alt"
                    size="is-small"
                    style="margin-left: 8px; font-size: 0.9em; cursor: pointer; color: gray;"
                  >
                  </b-icon>
                </div>
              </div>
            </div>
            <div v-else @click="editDescription">Add a description ...</div>
          </div>
        </section>

        <b-switch
          type="is-success"
          v-model="isCollectEmailAddresses"
          style="margin-bottom: 24px;"
        >
          Collect Email Addresses
        </b-switch>

        <div>
          <div style="font-size: 1.25em; margin-bottom: 24px;">
            Questions ({{ questionsCount }})
          </div>

          <SurveyQuestionItem
            v-if="isCollectEmailAddresses"
            :question-index="999"
            question-title="Email Address"
            question-type="SHORT"
            :is-required="true"
            :question-config="{}"
            :is-show-actions="false"
          />

          <div v-for="(question, index) in surveyQuestions" :key="question.id">
            <SurveyAddQuestion
              v-if="question.isUpdating"
              :is-updating="true"
              :update-question-index="index"
              :update-question-id="question.id"
              :update-question-title="question.question"
              :update-question-type="question.question_type"
              :update-is-required="question.is_required"
              :update-question-config="question.configuration"
              @on-click-cancel-updating-this-question="
                onClickCancelUpdatingQuestion
              "
              @on-click-add-or-update-question="addUpdateQuestion"
            />

            <SurveyQuestionItem
              v-else
              :question-index="index"
              :question-title="question.question"
              :question-type="question.question_type"
              :is-required="question.is_required"
              :question-config="question.configuration"
              @on-click-update-question="showUpdateQuestionForm"
              @on-click-delete-question="deleteQuestion(question.id)"
            />
          </div>

          <div v-if="isAddQuestionFormLoaded">
            <SurveyAddQuestion
              @on-click-discard-this-question="isAddQuestionFormLoaded = false"
              @on-click-add-or-update-question="addUpdateQuestion"
            />
          </div>
          <div
            v-else
            class="add-new-question-button"
            @click="isAddQuestionFormLoaded = true"
          >
            + Add a new question
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

import SurveyMenu from "@/components/survey/SurveyMenu.vue";
import SurveyAddQuestion from "@/components/survey/SurveyAddQuestion.vue";
import SurveyQuestionItem from "@/components/survey/SurveyQuestionItem.vue";

export default {
  components: {
    SurveyAddQuestion,
    SurveyMenu,
    SurveyQuestionItem,
  },

  data() {
    return {
      surveyId: null,
      isSurveyLoaded: false,
      isAddQuestionFormLoaded: false,
      collectEmailAddress: false,
    };
  },

  computed: {
    ...Vuex.mapGetters({
      surveyTitle: "getSurveyTitle",
      surveyDescription: "getSurveyDescription",
      surveyQuestions: "getSurveyQuestions",
    }),
    isCollectEmailAddresses: {
      get() {
        return this.$store.getters["getSurveyIsCollectEmailAddresses"];
      },
      async set(newValue) {
        await this.surveyIsCollectEmailAddressesUpdate({
          surveyId: this.surveyId,
          isCollectEmailAddresses: newValue
        });
      }
    },
    questionsCount() {
      let count = this.surveyQuestions ? this.surveyQuestions.length : 0;
      if (this.isCollectEmailAddresses) count += 1;
      return count
    }
  },

  created() {
    this.isSurveyLoaded = false;
    this.surveyId = this.$route.params.surveyId;
    const result = this.surveyRetrieve(this.surveyId);
    if (result.success) {
      this.isSurveyLoaded = true;
    }

    this.collectEmailAddress = this.isCollectEmailAddresses;
  },

  methods: {
    ...Vuex.mapActions([
      "surveyRetrieve",
      "surveyTitleUpdate",
      "surveyDescriptionUpdate",
      "surveyIsCollectEmailAddressesUpdate",
      "surveyCreateQuestion",
      "surveyUpdateQuestion",
      "surveyDeleteQuestion",
      "enableQuestionUpdate",
    ]),

    async addUpdateQuestion(payload) {
      let questionData = payload.questionData;
      let questionId = payload.questionData.id;

      switch (payload.action) {
        case "ADD":
          this.isAddQuestionFormLoaded = false;
          questionData.isUpdating = false;

          await this.surveyCreateQuestion({
            surveyId: this.surveyId,
            questionData,
          });
          break;

        case "UPDATE":
          questionData.isUpdating = false;
          delete questionData.id;

          await this.surveyUpdateQuestion({
            surveyId: this.surveyId,
            questionId,
            questionData,
          });
          break;
      }
    },

    showUpdateQuestionForm(questionIndex) {
      this.enableQuestionUpdate({
        questionIndex,
        isEnable: true,
      });
    },

    onClickCancelUpdatingQuestion(questionIndex) {
      this.enableQuestionUpdate({
        questionIndex,
        isEnable: false,
      });
    },

    deleteQuestion(questionId) {
      if (window.confirm("Delete this question?")) {
        this.surveyDeleteQuestion(questionId);
      }
    },

    editTitle() {
      this.$buefy.dialog.prompt({
        message: `Update Title`,
        inputAttrs: {
          placeholder: "Enter the survey title ...",
          maxlength: 128,
          value: this.surveyTitle,
        },
        trapFocus: true,
        onConfirm: async (updatedTitle) => {
          updatedTitle = updatedTitle.trim();
          if (updatedTitle) {
            await this.surveyTitleUpdate({
              surveyId: this.surveyId,
              updatedTitle,
            });
          }
        },
      });
    },

    editDescription() {
      this.$buefy.dialog.prompt({
        message: `Update Description`,
        inputAttrs: {
          placeholder: "Enter the survey description ...",
          maxlength: 1024,
          value: this.surveyDescription,
        },
        trapFocus: true,
        onConfirm: async (updatedDescription) => {
          updatedDescription = updatedDescription.trim();
          await this.surveyDescriptionUpdate({
            surveyId: this.surveyId,
            updatedDescription: updatedDescription ? updatedDescription : "",
          });
        },
      });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 2em;
  font-weight: lighter;
}

.add-new-question-button {
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.add-new-question-button:hover {
  background: #efefef;
}

.can-edit[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}

.can-edit[placeholder]:empty:focus::before {
  content: "";
}
</style>
