<template>
  <div style="background: #efefef">
    <BaseHeader />
    <div class="container is-max-desktop">
      <router-view />
    </div> 
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'

export default {
  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style scoped>
.container {
  /* background: #efefef; */
  /* border: 1px solid lightgray; */
  height: 100vh;
  padding: 24px;
}
</style>