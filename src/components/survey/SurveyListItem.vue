<template>
  <div class="item">
    <router-link
      class="item--title"
      tag="div"
      :to="{ name: 'PageSurvey', params: { surveyId: surveyItem.id } }"
    >
      {{ surveyItem.title }}
    </router-link>
    <div class="item--lastupdated">
      Last updated on {{ formattedModifiedOn }}
    </div>
    <div class="item--description">{{ surveyItem.description }}</div>
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
  computed: {
    formattedModifiedOn() {
      let modifiedOn = this.surveyItem.modified_on;
      modifiedOn = modifiedOn.slice(0, -5);
      const formattedModifiedOn = new Date(modifiedOn + "Z");
      return formattedModifiedOn.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
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
  text-decoration: underline;
  cursor: pointer;
}

.item--lastupdated {
  font-size: 0.9em;
  color: rgb(54, 54, 54);
}

.item--description {
  font-size: 0.9em;
  color: gray;
}
</style>
