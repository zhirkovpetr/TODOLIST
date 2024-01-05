import { makeAutoObservable, runInAction } from 'mobx';

import { authApi, LoginParamsType } from '../api/auth-api';
import { handleServerAppError, handleServerNetworkError } from '../shared/error-tils';

import { appStore } from './index';

type LoginType = {
  isLoggedIn: boolean;
  isLoginLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorEmail: string;
};

class LoginStore {
  login: LoginType = {
    isLoggedIn: false,
    isLoginLoading: 'idle',
    errorEmail: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoggedIn(value: boolean): void {
    this.login = {
      ...this.login,
      isLoggedIn: value,
    };
  }

  async loginUser(param: LoginParamsType): Promise<void> {
    this.login.isLoginLoading = 'pending';
    try {
      const data = await authApi.login(param);
      if (data.resultCode === 0) {
        runInAction(() => this.setIsLoggedIn(true));
      } else {
        handleServerAppError(data);
      }
    } catch (error) {
      runInAction(() => handleServerNetworkError(error as Error | null));
      this.login.errorEmail = 'Error! Failed to login! Try again!';
    } finally {
      runInAction(() => {
        this.login.isLoginLoading = 'succeeded';
        appStore.status = 'succeeded';
      });
    }
  }

  async logoutUser(): Promise<void> {
    try {
      const data = await authApi.logout();
      if (data.resultCode === 0) {
        runInAction(() => {
          this.setIsLoggedIn(false);
        });
      } else {
        handleServerAppError(data);
      }
    } catch (error) {
      runInAction(() => handleServerNetworkError(error as Error | null));
    } finally {
      runInAction(() => {
        appStore.status = 'succeeded';
      });
    }
  }
}

export default new LoginStore();
