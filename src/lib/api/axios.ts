import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { refreshManager } from '@/lib/services/refreshManager';
import { tokenService } from '@/lib/services/tokenService';

import { requestRefreshToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true,
});

/** 🔹 요청 인터셉터: 매 요청마다 accessToken 헤더에 추가 */
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = token;
    } else {
      console.warn('토큰이 없습니다. 인증이 실패할 가능성이 높음.');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/** 🔹 응답 인터셉터 */
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers['authorization'];
    if (newToken) {
      tokenService.setAccessToken(newToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status !== 406 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (refreshManager.isRefreshing()) {
      return new Promise((resolve, reject) => {
        refreshManager.enqueue((token: string) => {
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = token;
          resolve(api(originalRequest));
        }, reject);
      });
    }

    try {
      const newToken = await refreshManager.refresh(requestRefreshToken);

      tokenService.setAccessToken(newToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = newToken;

      return api(originalRequest);
    } catch (refreshError) {

      tokenService.clear();

      if (typeof window !== 'undefined') {
        alert('토큰이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
      }

      return Promise.reject(refreshError);
    }
  },
);
