import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
