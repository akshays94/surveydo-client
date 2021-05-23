<template>
  <div>
    <div class="columns">
      <SurveyMenu />

      <div
        class="column is-four-fifths"
        style="background: #fff; min-height: 100vh; padding: 24px;"
      >
        <section style="margin-bottom: 24px;">
          <div
            class="title can-edit"
            contenteditable="true"
            @input="updateTitle"
          >
            {{ surveyTitle }}
          </div>

          <div
            class="can-edit"
            contenteditable="true"
            @input="updateDescription"
          >
            {{ surveyDescription }}
          </div>

          <!-- <b-button
            type="is-dark"
            size="is-small"
            style="margin: 24px 0;"
            :disabled="isAddQuestionFormLoaded"
            @click="isAddQuestionFormLoaded = true"
          >
            Add question
          </b-button> -->
        </section>

        <!-- <div v-if="isAddQuestionFormLoaded">
          <SurveyAddQuestion
            @on-click-discard-this-question="isAddQuestionFormLoaded = false"
            @on-click-add-question="addUpdateQuestion"
          />
        </div> -->

        <div>
          <div style="font-size: 1.25em; margin-bottom: 24px;">
            Questions ({{ surveyQuestions.length }})
          </div>

          <div v-for="(question, index) in surveyQuestions" :key="question.id">
            <SurveyAddQuestion
              v-if="question.isUpdating"
              :is-updating="true"
              :update-question-index="index"
              :update-question-title="question.question"
              :update-question-type="question.question_type"
              :update-is-required="question.is_required"
              :update-question-config="question.configuration"
              @on-click-cancel-updating-this-question="
                onClickCancelUpdatingQuestion
              "
              @on-click-add-question="addUpdateQuestion"
            />

            <SurveyQuestionItem
              v-else
              :question-index="index"
              :question-title="question.question"
              :question-type="question.question_type"
              :is-required="question.is_required"
              :question-config="question.configuration"
              @on-click-update-question="showUpdateQuestionForm"
            />
          </div>

          <div v-if="isAddQuestionFormLoaded">
            <SurveyAddQuestion
              @on-click-discard-this-question="isAddQuestionFormLoaded = false"
              @on-click-add-question="addUpdateQuestion"
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
import Vue from "vue";
import Vuex from "vuex";
import { debounce } from "lodash";

// import { updateSurveyTitleAPI } from "@/endpoints/survey";

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
      questions: [],
    };
  },
  computed: {
    ...Vuex.mapGetters({
      surveyTitle: "getSurveyTitle",
      surveyDescription: "getSurveyDescription",
      surveyQuestions: "getSurveyQuestions",
    }),
  },
  created() {
    this.isSurveyLoaded = false;
    this.surveyId = this.$route.params.surveyId;
    const result = this.surveyRetrieve(this.surveyId);
    if (result.success) {
      this.isSurveyLoaded = true;
    }
  },
  methods: {
    ...Vuex.mapActions([
      "surveyRetrieve",
      "surveyTitleUpdate",
      "surveyDescriptionUpdate",
      "surveyCreateQuestion",
    ]),

    updateTitle: debounce(async function(event) {
      let updatedTitle = event.target.innerText;
      updatedTitle = updatedTitle.trim();
      if (updatedTitle) {
        await this.surveyTitleUpdate({
          surveyId: this.surveyId,
          updatedTitle,
        });
      }
    }, 1000),

    updateDescription: debounce(async function(event) {
      let updatedDescription = event.target.innerText;
      updatedDescription = updatedDescription.trim();
      if (updatedDescription) {
        await this.surveyDescriptionUpdate({
          surveyId: this.surveyId,
          updatedDescription,
        });
      }
    }, 1000),

    async addUpdateQuestion(payload) {
      let questionData = payload.questionData;
      let questionIndex = payload.questionIndex;

      switch (payload.action) {
        case "ADD":
          this.isAddQuestionFormLoaded = false;
          questionData.isUpdating = false;

          // this.questions.push(questionData);
          await this.surveyCreateQuestion({
            surveyId: this.surveyId,
            questionData,
          });
          break;

        case "UPDATE":
          questionData.isUpdating = false;
          Vue.set(this.questions, questionIndex, questionData);
          break;
      }
    },

    showUpdateQuestionForm(questionIndex) {
      this.questions[questionIndex]["isUpdating"] = true;
    },

    onClickCancelUpdatingQuestion(questionIndex) {
      this.questions[questionIndex]["isUpdating"] = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 2em;
  font-weight: lighter;
  /* margin-bottom: 12px; */
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

.can-edit:hover {
  /* background: #efefef; */
  /* transition: all 0.3s ease-in-out; */
}

/* [placeholder]:empty::before {
    content: attr(placeholder);
    color: #555; 
}

[placeholder]:empty:focus::before {
    content: "";
} */
</style>
