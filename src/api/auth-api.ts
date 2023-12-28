import { instance } from './instance';
import { TResponse } from './tasks-api';

export const authApi = {
  login(email: string, password: string, rememberMe: boolean, captcha?: string) {
    return instance
      .post<TResponse<{ userId?: number }>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then(res => res.data);
  },
};
