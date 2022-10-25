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
};

interface IRestClient {
  get<T>(url: string, headers?: HeadersInit): Promise<T>;
  put<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  post<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  del<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
}

export { RestMethod };
export type { Request, RestClientOptions, IRestClient };
