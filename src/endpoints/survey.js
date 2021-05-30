import { withAuthAxios } from "@/axios";

export const listSurveysAPI = () => withAuthAxios.get("/api/v1/surveys/");

export const retrieveSurveyAPI = (surveyId) =>
  withAuthAxios.get(`/api/v1/surveys/${surveyId}/`);

export const createUntitledSurveyAPI = () =>
  withAuthAxios.post("/api/v1/surveys/untitled-survey/");

export const updateSurveyTitleAPI = (surveyId, title) =>
  withAuthAxios.patch(`/api/v1/surveys/${surveyId}/partial/`, { title });

export const updateSurveyDescriptionAPI = (surveyId, description) =>
  withAuthAxios.patch(`/api/v1/surveys/${surveyId}/partial/`, { description });

export const createSurveyQuestionAPI = (questionData) =>
  withAuthAxios.post(`/api/v1/questions/`, questionData);

export const updateSurveyQuestionAPI = (questionID, questionData) =>
  withAuthAxios.put(`/api/v1/questions/${questionID}/`, questionData);

export const deleteSurveyQuestionAPI = (questionId) =>
  withAuthAxios.delete(`/api/v1/questions/${questionId}/`);
