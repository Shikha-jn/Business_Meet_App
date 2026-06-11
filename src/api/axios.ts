import axios from 'axios';
import {getData} from '../utils/asyncStorage';

const api = axios.create({
  baseURL: 'https://businessnetworkplatform.onrender.com/api/v1/',
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await getData('token'); // get from AsyncStorage/Zustand

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;