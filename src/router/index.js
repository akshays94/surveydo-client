import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import PageLogin from "@/components/pages/PageLogin.vue";
import PageNotFound from "@/components/pages/PageNotFound.vue";
import PageHome from "@/components/pages/PageHome.vue";
import PageSurveyList from "@/components/pages/PageSurveyList.vue";
import PageSurvey from "@/components/pages/PageSurvey.vue";
import PagePreview from "@/components/pages/PagePreview.vue";
import PageResponse from "@/components/pages/PageResponse.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: PageHome,
    children: [
      { path: "/", name: "PageSurveyList", component: PageSurveyList },
      { path: "/surveys/:surveyId", name: "PageSurvey", component: PageSurvey },
    ],
  },
  { path: "/login", name: "PageLogin", component: PageLogin },
  { path: "/preview/:surveyId", name: "PagePreview", component: PagePreview },
  {
    path: "/surveys/:surveyId/response",
    name: "PageResponse",
    component: PageResponse,
  },
  { path: "*", name: "PageNotFound", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const ignoreRoutes = ["PageLogin"];
  const isProtectedRoute = !ignoreRoutes.includes(to.name);

  const localStorageToken = localStorage.getItem("token");
  // console.log({ localStorageToken });
  const isNoTokenInStorage = !localStorageToken;
  // console.log({ isNoTokenInStorage });

  if (isProtectedRoute) {
    // Auto login for valid routes
    if (store.getters.hasToken) {
      next();
    } else {
      if (isNoTokenInStorage) {
        next({ name: "PageLogin" });
      } else {
        const result = await store.dispatch("authSetUserFromToken");
        if (result.success) {
          next();
        } else {
          next({ name: "PageLogin" });
        }
      }
    }
  } else {
    //
    if (isNoTokenInStorage) {
      next();
    } else {
      next({ name: "PageSurveyList" });
    }
  }
});

export default router;
