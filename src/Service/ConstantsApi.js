import axios from "axios";

export const UsersApiBaseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2"
export const LoginBaseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login";
export const BaseUrlusers = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/";
export const CardsStaticUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/";
export const api = axios.create({
  baseURL: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
