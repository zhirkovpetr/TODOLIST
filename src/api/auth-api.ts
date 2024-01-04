import { instance } from './instance';
import { TResponse } from './tasks-api';

export const authApi = {
  login(credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
  }) {
    return instance
      .post<TResponse<{ userId?: number }>>(`auth/login`, credentials)
      .then(res => res.data);
  },
  logout() {
    return instance.delete<TResponse>('auth/login').then(res => res.data);
  },
};
