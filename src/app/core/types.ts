import type { AxiosRequestConfig } from 'axios';

export type Error = {
  status: number;
  message: string;
};

export type RequestConfigExclude =
  | 'url'
  | 'data'
  | 'method'
  | 'params'
  | 'paramsSerializer';

export type RequestConfig<P, D> = Omit<
  AxiosRequestConfig<D>,
  RequestConfigExclude
> & {
  id?: string | number | null;
  data?: D | null;
  params?: P | null;
};

export type Request<P, D, R = void> = (
  config?: RequestConfig<P, D>
) => Promise<[R, Error]>;

export type Paginated<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};
