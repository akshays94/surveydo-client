<template>
  <div class="item">
    <router-link
      class="item--title"
      tag="div"
      :to="{ name: 'PageSurvey', params: { surveyId: surveyItem.id } }"
    >
      {{ surveyItem.title }}
    </router-link>
    <div class="item--description">{{ surveyItem.description }}</div>
    <div class="item--description">{{ surveyItem.modified_on }}</div>
  </div>
</template>

<script>
export default {
  props: {
    surveyItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item {
  border: 1px solid lightgray;
  padding: 12px;
  margin-bottom: 24px;
}

.item--title {
  font-size: 1.2em;
}

.item--description {
  color: gray;
}
</style>
