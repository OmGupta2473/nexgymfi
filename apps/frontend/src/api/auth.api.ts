import { api } from './axios';
import type { AuthTokens, AuthUser, LoginPayload } from './types';

export const loginRequest = async (payload: LoginPayload) => {
  const response = await api.post<AuthTokens>('/auth/login', payload);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<AuthUser>('/auth/me');
  return response.data;
};

export const refreshRequest = async (refreshToken: string) => {
  const response = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post<{ message: string }>('/auth/logout');
  return response.data;
};
