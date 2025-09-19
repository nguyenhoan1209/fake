import type { AxiosError, AxiosHeaderValue, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import { notifyError } from 'components/custom/Notification';
import { KEY_AUTH_INFORMATION, NETWORK_CONFIG } from 'config/constants';
import { t } from 'i18next';
import { navigateToPublicRoute } from 'routes';
import store from 'store';
import { logoutUser } from 'store/slices/userSlice';
import { BaseResponse } from 'types';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTION = 'OPTION',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

type ConfigOptions = {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  hideError?: boolean;
  isFormData?: boolean;
  headerValueType?: AxiosHeaderValue;
};


const getAuthorization = (defaultOptions: ConfigOptions | undefined) => {
  if (defaultOptions?.withToken === false) return;
  if (defaultOptions?.token) {
    return `Basic ${defaultOptions?.token}`;
  }
  const state = store.getState();
  const apiKey = state.user?.login?.api_key;
  const email = state.user?.login?.email;
  if (apiKey && email) {
    const credentials = `${email}:${apiKey}`;
    const encodedCredentials = btoa(credentials);
    return `Basic ${encodedCredentials}`;
  }
  console.error('TOKEN OR EMAIL NOT FOUND!');
  return undefined;
};


export const fetcher = <T>(
  config: AxiosRequestConfig & {
    method: HTTPMethod;
  },
  options?: ConfigOptions,
) => {
  return new Promise<T>((resolve, reject) => {
    axios
      .create({
        baseURL: `${import.meta.env.VITE_BASE_API_URL}/`,
        headers: {
          Accept: options?.headerValueType ?? (options?.isFormData ? 'multipart/form-data' : 'application/json'),
          Authorization: getAuthorization(options),
        },
        timeout: NETWORK_CONFIG.TIMEOUT,
        withCredentials: NETWORK_CONFIG.WITH_CREDENTIALS,
      })
      .request<T | undefined, AxiosResponse<T>>(config)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        }
      })
      .catch((error: AxiosError<BaseResponse<T>>) => {
        if (
          error.response?.status &&
          +error.response?.status === 401 &&
          typeof window !== 'undefined' &&
          window.localStorage.getItem(KEY_AUTH_INFORMATION)
        ) {
          logoutUser();
          return window.location.replace(navigateToPublicRoute());
        }
        reject(error);
      });
  });
};
