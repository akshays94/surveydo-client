<template>
  <div style="background: #fff; padding: 24px; height: 100%;">

    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <BasePageTitle title="My Surveys" />
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
            <b-button
              type="is-dark"
              @click="createNewSurvey()"
            >
              Create a new survey
            </b-button>
        </div>
      </div>
    </nav>


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
