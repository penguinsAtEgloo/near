import { api, fileApi } from '.';

export const postImage = async (data: FormData) => {
  return await fileApi
    .post(`/v1/images`, data)
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      console.log(error.response);
    });
};

export const getGift = async (cuid?: string) => {
  return await api
    .get(`/v1/images/${cuid}`)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.log(error.response);
    });
};
