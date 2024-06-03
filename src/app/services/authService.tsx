import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/local`, {
    identifier: username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email: username,
    password,
  });
  return response.data;
};