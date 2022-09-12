import { api, fileApi } from '.';

export const postImage = async (data: FormData) => {
  return await fileApi
    .post(`/v1/images`, data)
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error.response);
    });
};

export const getImage = async (cuid?: string) => {
  return await api.post(`/v1/images/${cuid}`, cuid);
};
