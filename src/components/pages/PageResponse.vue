<template>
  <section>
    <div
      class="container is-max-desktop"
      style="border: 1px solid lightgray; padding: 24px; margin-top: 60px; margin-bottom: 80px;"
    >
      <BasePageTitle :title="title || ''" />

      <p style="margin-bottom: 24px;">{{ description }}</p>

      <SurveyQuestionItem
        v-if="isCollectEmailAddresses"
        :question-index="999"
        question-id="EMAIL_ADDRESS"
        question-title="Email Address"
        question-type="SHORT"
        :is-required="true"
        :question-config="{}"
        :is-show-actions="false"
        @on-answer-update="onAnswerUpdate"
      />

      <div v-for="(question, index) in questions" :key="question.id">
        <SurveyQuestionItem
          :question-index="index"
          :question-id="question.id"
          :question-title="question.question"
          :question-type="question.question_type"
          :is-required="question.is_required"
          :question-config="question.configuration"
          :is-show-actions="false"
          @on-answer-update="onAnswerUpdate"
        />
      </div>

      <b-button type="is-primary">Submit</b-button>
    </div>
  </section>
</template>

<script>
import { retrieveSurveyAPI } from "@/endpoints/survey";

import BasePageTitle from "@/components/base/BasePageTitle.vue";
import SurveyQuestionItem from "@/components/survey/SurveyQuestionItem.vue";

export default {
  name: "PageResponse",

  components: {
    BasePageTitle,
    SurveyQuestionItem,
  },

  data() {
    return {
      surveyId: null,
      title: null,
      description: null,
      isCollectEmailAddresses: false,
      questions: [],

      emailAddress: "",
      answerMap: {},
    };
  },

  async created() {
    this.surveyId = this.$route.params.surveyId;
    const response = await retrieveSurveyAPI(this.surveyId);

    this.title = response.data.title;
    this.description = response.data.description;
    this.isCollectEmailAddresses = response.data.is_collect_email_addresses;
    this.questions = response.data.questions;
  },

  methods: {
    onAnswerUpdate(answerPayload) {
      const { answer, questionId, otherAnswer, questionType } = answerPayload;
      if (questionId === "EMAIL_ADDRESS") {
        this.emailAddress = answer;
      } else {
        if (["MULTI", "CHECK"].includes(questionType)) {
          this.answerMap[questionId] = {
            answer,
            otherAnswer,
          };
        } else {
          this.answerMap[questionId] = answer;
        }
      }
    },
  },
};
</script>
