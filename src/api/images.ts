import axios from 'axios';
import { api, fileApi } from '.';

export const postImages = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return await fetch(
    `http://shiny-near-dev-service-alb-937353192.ap-northeast-2.elb.amazonaws.com/v1/images`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization ',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE,FETCH',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'multipart/form-data',
      },
      body: formData, // content: content
    }
  )
    .then((res) => {
      console.log(res);
      // return res.request.response;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getImages = async (CUID: string) => {
  const response = await fetch(
    `http://shiny-near-dev-service-alb-937353192.ap-northeast-2.elb.amazonaws.com/v1/images/${CUID}`,
    {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: {},
    }
  )
    .then((res) => {
      console.log(res);
      // return res.request.response;
    })
    .catch((error) => {
      console.log(error.response);
    });
  return await response;
};

export const postImages2 = async (data: FormData) => {
  return await fileApi.post(`/v1/images`, data);
};

export const getImages2 = async (cuid?: string) => {
  return await api.post(`/v1/images/${cuid}`, cuid);
};
