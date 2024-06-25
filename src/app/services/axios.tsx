// utils/axios.ts
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const token = getCookie('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    window.location.href = 'https://identity.blockchainbilliards.io/logout';
  }
  return Promise.reject(error);
});

export default instance;
