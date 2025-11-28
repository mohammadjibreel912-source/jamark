// src/services/apiClient.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://165.227.20.222",
  headers: {
    "Content-Type": "application/json",
  },
});
