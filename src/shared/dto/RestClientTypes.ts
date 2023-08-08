import { HeadersInit } from 'electron-fetch';

enum RestMethod {
  get = 'GET',
  put = 'PUT',
  post = 'POST',
  delete = 'DELETE',
}

type Request = {
  url: string,
  method: RestMethod,
  headers?: HeadersInit,
  body?: string
};

type RestClientOptions = {
  token: string;
  user: string;
  isCloudService: boolean;
};

const DefaultRestClientOptions: RestClientOptions = {
  token: '',
  user: '',
  isCloudService: false,
};

interface IRestClient {
  get<T>(url: string, headers?: HeadersInit): Promise<T>;
  put<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  post<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  del<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
}

export { RestMethod, DefaultRestClientOptions };
export type {
  Request, RestClientOptions, IRestClient,
};
