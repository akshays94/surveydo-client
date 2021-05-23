<template>
  <div class="box">
    <b-field label="Username">
      <b-input v-model="username"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="password"></b-input>
    </b-field>

    <b-button @click="login()">Login</b-button>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  data() {
    return {
      username: "timf",
      password: "welcome@123",
    };
  },

  methods: {
    ...Vuex.mapActions(["authLogin"]),
    async login() {
      const result = await this.authLogin({
        username: this.username,
        password: this.password,
      });
      if (result.success) {
        this.$router.replace({ name: "PageSurveyList" });
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 40%;
}
</style>
