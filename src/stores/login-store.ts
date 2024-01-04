import { makeAutoObservable, runInAction } from 'mobx';

import { authApi } from '../api/auth-api';

type LoginType = {
  loginRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  data: {
    userId?: number;
  };
  errorEmail?: string;
};

class LoginStore {
  login: LoginType = {
    loginRequestStatus: 'idle',
    data: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  async loginUser(credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Promise<void> {
    this.login.loginRequestStatus = 'pending';
    try {
      const data = await authApi.login(credentials);
      runInAction(() => {
        this.login = {
          data: {
            userId: data.data.userId,
          },
          loginRequestStatus: 'succeeded',
          errorEmail: undefined,
        };
      });
    } catch (error) {
      this.login.loginRequestStatus = 'failed';
      this.login.errorEmail = 'Error! Failed to login! Try again!';
    }
  }

  async logoutUser(): Promise<void> {
    this.login.loginRequestStatus = 'pending';
    try {
      const data = await authApi.logout();
      runInAction(() => {
        this.login = {
          data: data.data,
          loginRequestStatus: 'succeeded',
        };
      });
    } catch (error) {
      this.login.loginRequestStatus = 'failed';
    }
  }
}

export default new LoginStore();
