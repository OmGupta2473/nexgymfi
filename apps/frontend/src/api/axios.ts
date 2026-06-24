import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { AuthTokens } from './types';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ACCESS_TOKEN_KEY = 'gymflex.accessToken';
const REFRESH_TOKEN_KEY = 'gymflex.refreshToken';
const LEGACY_ACCESS_TOKEN_KEY = 'accessToken';
const LEGACY_REFRESH_TOKEN_KEY = 'refreshToken';

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

export const getStoredTokens = (): AuthTokens => ({
  accessToken:
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY),
  refreshToken:
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    localStorage.getItem(LEGACY_REFRESH_TOKEN_KEY),
});

export const setStoredTokens = (tokens: AuthTokens) => {
  if (tokens.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(LEGACY_ACCESS_TOKEN_KEY, tokens.accessToken);
  }

  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(LEGACY_REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  window.dispatchEvent(new Event('gymflex:tokens-changed'));
};

export const clearStoredTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event('gymflex:tokens-changed'));
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getStoredTokens();

        if (!refreshToken) {
          throw new Error('Missing refresh token');
        }

        const response = await axios.post<AuthTokens>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true },
        );

        setStoredTokens(response.data);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearStoredTokens();
        unauthorizedHandler?.();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
