/* eslint-disable @typescript-eslint/comma-dangle */
import fetch, { HeadersInit } from 'electron-fetch';
import useLoggerService from '../app/common/LoggerService';
import {
  RestClientOptions, IRestClient, RestMethod, Request, DefaultRestClientOptions
} from './dto/RestClientTypes';
import useSnackbarService from '../app/services/SnackbarService';

const useAuthenticationMiddleware = (options: RestClientOptions) => {
  const getAuthenticationHeaders = async (headers: HeadersInit) => {
    if (options.isCloudService) {
      if (options.token && options.user) {
        headers = {
          ...headers,
          Authorization: `Basic ${Buffer.from(`${options.user}:${options.token}`).toString('base64')}`,
        };
      }
    } else if (options.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${options.token}`,
      };
    }

    return headers;
  };

  return {
    getAuthenticationHeaders,
  };
};

const useRestClient = (options?: RestClientOptions): IRestClient => {
  options = options || DefaultRestClientOptions;

  const logger = useLoggerService('RestClient');
  const snackbar = useSnackbarService();
  const authenticationMiddleware = useAuthenticationMiddleware(options);

  const getHeaders = (headers?: HeadersInit): HeadersInit => ({
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const send = async <T, >(
    request: Request,
    resolve: (value: T) => void,
    reject: (value: any) => void,
  ) => {
    logger.debug(
      `Request
            URL: ${request.url}
            Method: ${request.method}
            Headers: ${JSON.stringify(request.headers)}
            Body: ${request.body}`,
    );

    const rawResponse = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    logger.debug(
      `Response
            URL: ${request.url}
            Is OK: ${rawResponse.ok}
            Status: ${rawResponse.status} -> ${rawResponse.statusText}`,
    );

    if (rawResponse.status >= 200 && rawResponse.status < 400) {
      const responseData: any = await rawResponse.json();
      resolve(responseData);
    } else {
      reject(rawResponse);
      logger.error(rawResponse.statusText);
      snackbar.showError(`Connection error: ${rawResponse.statusText}`);
    }
  };

  const makeRequest = async <T, >(
    url: string,
    method: RestMethod,
    headers?: HeadersInit,
    body?: object,
  ): Promise<T> => {
    let allHeaders = getHeaders(headers);

    if (options && options.token !== '') {
      allHeaders = await authenticationMiddleware.getAuthenticationHeaders(allHeaders);
    }

    const request = {
      url,
      method,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : body,
    };

    return new Promise((resolve: (data: T) => void, reject: any) => {
      send(request, resolve, reject);
    });
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

export default useRestClient;
