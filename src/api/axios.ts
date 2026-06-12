import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
  baseURL: 'https://businessnetworkplatform.onrender.com/api/v1/',
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = await useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export default api;