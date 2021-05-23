import Vue from "vue";
import Vuex from "vuex";

import { loginAPI, validateTokenAPI } from "@/endpoints/auth";
import {
  retrieveSurveyAPI,
  updateSurveyTitleAPI,
  updateSurveyDescriptionAPI,
  createSurveyQuestionAPI,
} from "@/endpoints/survey";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    auth: {
      token: null,
      user: null,
    },
    survey: {},
  };
};

export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
    getUsername: (state) => (state.auth.user ? state.auth.user.username : ""),
    hasToken: (state) => state.auth.token !== null,

    getSurveyId: (state) => state.survey.id,
    getSurveyTitle: (state) => state.survey.title,
    getSurveyDescription: (state) => state.survey.description,
    getSurveyQuestions: (state) => state.survey.questions,
  },
  mutations: {
    SET_AUTH_TOKEN: (state, token) => {
      Vue.set(state.auth, "token", token);
    },
    SET_AUTH_USER: (state, user) => {
      Vue.set(state.auth, "user", user);
    },
    SET_SURVEY: (state, survey) => {
      Vue.set(state, "survey", survey);
    },
    SET_SURVEY_TITLE: (state, updatedTitle) => {
      Vue.set(state.survey, "title", updatedTitle);
    },
    SET_SURVEY_DESCRIPTION: (state, updatedTitle) => {
      Vue.set(state.survey, "description", updatedTitle);
    },
    ADD_SURVEY_QUESTION: (state, payload) => {
      state.survey.questions.push(payload);
    },
  },
  actions: {
    async authLogin({ commit }, payload) {
      const { username, password } = payload;
      const response = await loginAPI(username, password);
      if (response.status === 200) {
        const { token, ...userData } = response["data"];

        commit("SET_AUTH_TOKEN", token);
        commit("SET_AUTH_USER", userData);
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        return { success: true };
      }
      return { success: false };
    },

    async authSetUserFromToken({ commit }) {
      const response = await validateTokenAPI();
      if (response.status === 200) {
        commit("SET_AUTH_TOKEN", localStorage.getItem("token"));
        commit("SET_AUTH_USER", JSON.parse(localStorage.getItem("userData")));
        return { success: true };
      }
      return { success: false };
    },

    async surveyRetrieve({ commit }, surveyId) {
      const response = await retrieveSurveyAPI(surveyId);
      if (response.status === 200) {
        commit("SET_SURVEY", response.data);
        return { success: true };
      }
      return { success: false };
    },

    async surveyTitleUpdate({ commit }, payload) {
      const { surveyId, updatedTitle } = payload;
      const response = await updateSurveyTitleAPI(surveyId, updatedTitle);
      if (response.status === 200) {
        commit("SET_SURVEY_TITLE", updatedTitle);
      }
    },

    async surveyDescriptionUpdate({ commit }, payload) {
      const { surveyId, updatedDescription } = payload;
      const response = await updateSurveyDescriptionAPI(
        surveyId,
        updatedDescription
      );
      if (response.status === 200) {
        commit("SET_SURVEY_DESCRIPTION", updatedDescription);
      }
    },

    async surveyCreateQuestion({ commit }, payload) {
      const { surveyId, questionData } = payload;
      const data = {
        survey: surveyId,
        ...questionData,
      };
      const response = await createSurveyQuestionAPI(data);
      if (response.status === 201) {
        commit("ADD_SURVEY_QUESTION", data);
        return { success: true };
      }
      return { success: false };
    },
  },
});
