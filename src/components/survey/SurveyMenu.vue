<template>
  <div class="column">
    <b-button type="is-text" style="margin-bottom: 4px;">
      Questions
    </b-button>
    <b-button type="is-text" style="margin-bottom: 4px;">
      Preview
    </b-button>
    <b-button type="is-text" style="margin-bottom: 4px;">
      Copy this survey link
    </b-button>
    <b-button type="is-text" style="margin-bottom: 4px;">
      Responses
    </b-button>
    <b-button
      tag="router-link"
      :to="{ name: 'PageSurveyList' }"
      type="is-text is-danger is-light"
      style="margin-bottom: 4px;"
    >
      Back to my surveys
    </b-button>
  </div>
</template>