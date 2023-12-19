import { makeAutoObservable } from 'mobx';

class AppStore {
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';

  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setStatus(status: 'idle' | 'loading' | 'succeeded' | 'failed'): void {
    this.status = status;
  }

  setError(error: string | null): void {
    this.error = error;
  }
}

export default new AppStore();
