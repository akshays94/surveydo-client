<template>
  <div>
    <div class="columns">
      <SurveyMenu />

      <div class="column is-four-fifths" style="background: #fff; height: 100vh; padding: 24px;">
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
      </div>
    </div>
  </div>

</template>

<script>
import SurveyMenu from '@/components/survey/SurveyMenu.vue'
import SurveyAddQuestion from '@/components/survey/SurveyAddQuestion.vue'

export default {
  components: {
    SurveyAddQuestion,
    SurveyMenu
  },
  data() {
    return {
      isAddQuestionFormLoaded: false
    }
  },
  methods: {
    addQuestion(questionObject) {
      console.log('new question', questionObject)
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