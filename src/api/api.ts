import axios from "axios";

export const API_URL = "http://localhost:5555/api";

export const $axios = axios.create({
  baseURL: API_URL,
});
