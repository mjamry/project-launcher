/* eslint-disable @typescript-eslint/comma-dangle */
import { HeadersInit } from 'electron-fetch';
import {
  RestClientOptions, IRestClient, RestMethod, DefaultRestClientOptions
} from '../../shared/dto/RestClientTypes';

const { ipcRenderer } = window.require('electron');

const useRestClientAdapter = (options?: RestClientOptions): IRestClient => {
  options = options || DefaultRestClientOptions;

  const makeRequest = async <T, >(
    url: string,
    method: RestMethod,
    headers?: HeadersInit,
    body?: object,
  ): Promise<T> => {
    const response = await ipcRenderer.invoke(method, options, url, headers, body);
    return response;
  };

  const get = async <T, >(
    url: string,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest<T>(url, RestMethod.get, headers);

  const put = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest<T>(url, RestMethod.put, headers, body);

  const post = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest(url, RestMethod.post, headers, body);

  const del = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest(url, RestMethod.delete, headers, body);

  return {
    get,
    put,
    post,
    del,
  };
};

export default useRestClientAdapter;
