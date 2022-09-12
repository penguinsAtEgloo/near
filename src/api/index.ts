import axios, { AxiosInstance } from 'axios';

function createBasicInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL:
      process.env.REACT_APP_BASE_URL || process.env.REACT_APP_LOCALHOST_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
}

function createFileInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL:
      process.env.REACT_APP_BASE_URL || process.env.REACT_APP_LOCALHOST_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
