// src/services/apiClient.js
import axios from "axios";

const API_BASE_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_BASE_URL 
    : "/api"; // ⬅️ CRITICAL: MUST BE "/api" in development

export const api = axios.create({
    baseURL: API_BASE_URL,
    // Headers must NOT contain Content-Type: application/json for file uploads
    headers: { /* Other headers like Authorization if needed */ },
});