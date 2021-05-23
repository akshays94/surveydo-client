<template>
  <div class="level" style="padding: 12px; background: lightgray;">
    <div class="level-left">
      <div class="level-item">
        SURVEYDO
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        @{{ username }}
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters({
      username: "getUsername",
    }),
  },
};
</script>
