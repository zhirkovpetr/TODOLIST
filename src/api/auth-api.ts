import { instance } from './instance';
import { TResponse } from './tasks-api';

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const authApi = {
  me() {
    return instance
      .get<TResponse<{ id: number; email: string; login: string }>>('auth/me')
      .then(res => res.data);
  },
  login(data: LoginParamsType) {
    return instance
      .post<TResponse<{ userId?: number }>>(`auth/login`, data)
      .then(res => res.data);
  },
  logout() {
    return instance.delete<TResponse>('auth/login').then(res => res.data);
  },
};
