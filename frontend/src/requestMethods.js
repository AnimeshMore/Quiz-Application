import axios from "axios";

const BASE_URL = "/api/v1";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

