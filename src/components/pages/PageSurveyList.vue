<template>
  <div style="background: #fff; padding: 24px; height: 100vh;">
    <BasePageTitle title="My Surveys" />

    <b-button
      tag="router-link"
      :to="{ name: 'PageSurvey' }"
      type="is-dark"
      style="margin-bottom: 24px;"
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
import BasePageTitle from '@/components/base/BasePageTitle.vue'
import SurveyListItem from '@/components/survey/SurveyListItem.vue'

export default {
  components: {
    BasePageTitle,
    SurveyListItem
  },
  data() {
    return {
      surveys: [
        {
          id: 1,
          title: 'Survey 1',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis inventore debitis quaerat ea, nesciunt suscipit autem repellat, nihil ipsa nobis eius temporibus quo laborum explicabo magnam maxime impedit illo.'
        },
        {
          id: 2,
          title: 'Survey 2',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis inventore debitis quaerat ea, nesciunt suscipit autem repellat, nihil ipsa nobis eius temporibus quo laborum explicabo magnam maxime impedit illo.'
        }
      ]
    }
  }
}
</script>