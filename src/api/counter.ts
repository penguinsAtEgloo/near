import { api } from './index';
import { AxiosResponse } from 'axios';

export const countUpVisitor = async () => {
  return await api
    .get(`/v1/visitors/countUp`)
    .then((response: AxiosResponse<VisitorCountDTO>) => {
      return response;
    })
    .catch((error: any) => {
      console.log(error.response);
    });
};

export interface VisitorCountDTO {
  count: number;
}
