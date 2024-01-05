import { makeAutoObservable, runInAction } from 'mobx';

import { authApi } from '../api/auth-api';
import { handleServerAppError, handleServerNetworkError } from '../shared/error-tils';

import { appStore, loginStore } from './index';

class AppStore {
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';

  error: string | null = null;

  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setInitialized(isInitialized: boolean): void {
    this.isInitialized = isInitialized;
  }

  setStatus(status: 'idle' | 'loading' | 'succeeded' | 'failed'): void {
    this.status = status;
  }

  setError(error: string | null): void {
    this.error = error;
  }

  async setMe(): Promise<void> {
    appStore.status = 'loading';
    try {
      const data = await authApi.me();
      if (data.resultCode === 0) {
        runInAction(() => {
          loginStore.login.isLoggedIn = true;
        });
      } else {
        handleServerAppError(data);
      }
      this.setInitialized(true);
    } catch (error) {
      runInAction(() => handleServerNetworkError(error as Error | null));
    } finally {
      runInAction(() => {
        appStore.status = 'succeeded';
      });
    }
  }
}

export default new AppStore();
