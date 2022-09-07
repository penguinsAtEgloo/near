import axios from 'axios';

function createBasicInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
}

function createFileInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
