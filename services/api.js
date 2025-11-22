import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com', // غيرها بالرابط الحقيقي
});

export const fetchData = (endpoint) => api.get(endpoint);
export const postData = (endpoint, data) => api.post(endpoint, data);

export default api;
