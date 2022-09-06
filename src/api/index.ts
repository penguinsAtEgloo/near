import axios from 'axios';

function createBasicInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      withCredentials: true,
      'Content-Type': 'application/json',
    },
  });

  return instance;
}

function createFileInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      withCredentials: true,
      'Content-Type': 'multipart/form-data',
    },
  });

  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
