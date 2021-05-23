import { withoutAuthAxios } from "@/axios";
import { withAuthAxios } from "@/axios";

export const loginAPI = (username, password) =>
  withoutAuthAxios.post("/login/", {
    username,
    password,
  });

export const validateTokenAPI = () =>
  withAuthAxios.get("/api/v1/auth/validate-token/");
