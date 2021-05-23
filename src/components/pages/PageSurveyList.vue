<template>
  <div style="background: #fff; padding: 24px; height: 100vh;">
    <BasePageTitle title="My Surveys" />

    <!-- <b-button
      tag="router-link"
      :to="{ name: 'PageSurvey' }"
      type="is-dark"
      style="margin-bottom: 24px;"
    >
      Create a new survey
    </b-button> -->

    <b-button
      type="is-dark"
      style="margin-bottom: 24px;"
      @click="createNewSurvey()"
    >
      Create a new survey
    </b-button>

    <SurveyListItem
      v-for="survey in surveys"
      :key="survey.id"
      :survey-item="survey"
    />
  </div>
</template>

<script>
import BasePageTitle from "@/components/base/BasePageTitle.vue";
import SurveyListItem from "@/components/survey/SurveyListItem.vue";

import { listSurveysAPI, createUntitledSurveyAPI } from "@/endpoints/survey";

export default {
  components: {
    BasePageTitle,
    SurveyListItem,
  },
  data() {
    return {
      surveys: [],
    };
  },
  created() {
    this.getAllSurveys();
  },
  methods: {
    async getAllSurveys() {
      const response = await listSurveysAPI();
      if (response.status === 200) {
        this.surveys = response.data;
      }
    },

    async createNewSurvey() {
      const response = await createUntitledSurveyAPI();
      if (response.status === 200) {
        this.$router.replace({
          name: "PageSurvey",
          params: {
            surveyId: response.data.id,
          },
        });
      }
    },
  },
};
</script>
