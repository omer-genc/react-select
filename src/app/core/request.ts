import axios, { AxiosRequestConfig } from 'axios';

import { Error } from './types';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const error: Error = {
      status: 500,
      message: 'Internal Server Error',
    };

    if (err.response) {
      error.status = err.response.status;
      if (err.response.data) {
        error.message = err.response.data.error;
      }
    }
    return Promise.reject(error);
  }
);

const request = async (config: AxiosRequestConfig): Promise<any> => {
  try {
    const response = await instance.request(config);

    return [response.data, null];
  } catch (error: any) {
    return [null, error];
  }
};

export default request;
