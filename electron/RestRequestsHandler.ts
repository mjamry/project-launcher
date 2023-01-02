/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import { HeadersInit } from 'electron-fetch';
import { RestClientOptions, RestMethod } from '../src/shared/dto/RestClientTypes';
import useRestClient from '../src/shared/RestClient';

type IRestRequestsHandler = {
  init: () => void;
};

const useRestRequestsHandler = (): IRestRequestsHandler => {
  const init = () => {
    ipcMain.handle(RestMethod.get, async (
      event,
      options: RestClientOptions,
      url: string,
      headers: HeadersInit,
    ) => {
      const restClient = useRestClient(options);

      const response = await restClient
        .get<any>(url, headers)
        .catch((reason) => console.error(reason));
      return response;
    });

    ipcMain.handle(RestMethod.put, async (
      event,
      options: RestClientOptions,
      url: string,
      headers: HeadersInit,
      body: object,
    ) => {
      const restClient = useRestClient(options);

      const response = await restClient
        .put<any>(url, body, headers)
        .catch((reason) => console.error(reason));
      return response;
    });

    ipcMain.handle(RestMethod.post, async (
      event,
      options: RestClientOptions,
      url: string,
      headers: HeadersInit,
      body: object,
    ) => {
      const restClient = useRestClient(options);

      const response = await restClient
        .post<any>(url, body, headers)
        .catch((reason) => console.error(reason));
      return response;
    });

    ipcMain.handle(RestMethod.delete, async (
      event,
      options: RestClientOptions,
      url: string,
      headers: HeadersInit,
      body: object,
    ) => {
      const restClient = useRestClient(options);

      const response = await restClient
        .del<any>(url, body, headers)
        .catch((reason) => console.error(reason));
      return response;
    });
  };

  return {
    init,
  };
};

export default useRestRequestsHandler;
