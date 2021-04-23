<template>
  <div>
    <div class="columns">
      <SurveyMenu />

      <div class="column is-four-fifths" style="background: #fff; min-height: 100vh; padding: 24px;">
        <section>
          <div class="title can-edit" contenteditable="true">
            Untitled Survey
          </div>

          <div class="can-edit" contenteditable="true">
            Add a description ...
          </div>

          <b-button
            type="is-dark"
            size="is-small"
            style="margin: 24px 0;"
            :disabled="isAddQuestionFormLoaded"
            @click="isAddQuestionFormLoaded = true"
          >
            Add question
          </b-button>
        </section>

        <div v-if="isAddQuestionFormLoaded">
          <SurveyAddQuestion
            @on-click-discard-this-question="isAddQuestionFormLoaded = false"
            @on-click-add-question="addQuestion"
          />
        </div>

        <div>
          QUESTIONS: <br> {{ questions }}
          <div
            v-for="(question, index) in questions"
            :key="question.id"
          >
            <SurveyAddQuestion
              v-if="question.isUpdating"
              :is-updating="true"
              :update-question-title="question.questionTitle"
              :update-question-type="question.questionType"
              :update-is-required="question.isRequired"
              :update-question-config="question.questionConfig"
              @on-click-discard-this-question="isAddQuestionFormLoaded = false"
              @on-click-add-question="addQuestion"
            />

            <SurveyQuestionItem
              v-else
              :question-index="index"
              :question-title="question.questionTitle"
              :question-type="question.questionType"
              :is-required="question.isRequired"
              :question-config="question.questionConfig"
              @on-click-update-question="updateQuestion"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SurveyMenu from '@/components/survey/SurveyMenu.vue'
import SurveyAddQuestion from '@/components/survey/SurveyAddQuestion.vue'
import SurveyQuestionItem from '@/components/survey/SurveyQuestionItem.vue'

export default {
  components: {
    SurveyAddQuestion,
    SurveyMenu,
    SurveyQuestionItem
  },
  data() {
    return {
      isAddQuestionFormLoaded: false,
      questions: []
    }
  },
  methods: {
    addQuestion(newQuestion) {
      this.isAddQuestionFormLoaded = false
      newQuestion.isUpdating = false
      this.questions.push(newQuestion)
    },

    updateQuestion(questionIndex) {
      this.questions[questionIndex]['isUpdating'] = true
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 2em;
  font-weight: lighter;
  /* margin-bottom: 12px; */
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