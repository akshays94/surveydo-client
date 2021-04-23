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
            Questions ({{ questions.length }})
          </div>

          <div
            v-for="(question, index) in questions"
            :key="question.id"
          >
            <SurveyAddQuestion
              v-if="question.isUpdating"
              :is-updating="true"
              :update-question-index="index"
              :update-question-title="question.questionTitle"
              :update-question-type="question.questionType"
              :update-is-required="question.isRequired"
              :update-question-config="question.questionConfig"
              @on-click-discard-this-question="isAddQuestionFormLoaded = false"
              @on-click-add-question="addUpdateQuestion"
            />

            <SurveyQuestionItem
              v-else
              :question-index="index"
              :question-title="question.questionTitle"
              :question-type="question.questionType"
              :is-required="question.isRequired"
              :question-config="question.questionConfig"
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
import Vue from 'vue'

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
    addUpdateQuestion(payload) {
      let questionData = payload.questionData
      let questionIndex = payload.questionIndex

      switch (payload.action) {
        case 'ADD':
          this.isAddQuestionFormLoaded = false
          questionData.isUpdating = false
          this.questions.push(questionData)
          break

        case 'UPDATE':
          questionData.isUpdating = false
          Vue.set(this.questions, questionIndex, questionData)
          break
      }
    },

    showUpdateQuestionForm(questionIndex) {
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

.add-new-question-button {
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
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