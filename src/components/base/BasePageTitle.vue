<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 2em;
  font-weight: lighter;
  margin-bottom: 24px;
}
</style>