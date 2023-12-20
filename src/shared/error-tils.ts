import { TResponse } from '../api/tasks-api';
import { appStore } from '../stores';

export const handleServerAppError = <D>(data: TResponse<D>): void => {
  if (data.messages.length) {
    appStore.setError(data.messages[0]);
  } else {
    appStore.setError('some error occurred!');
  }
};

export const handleServerNetworkError = (error: Error | null): void => {
  appStore.status = 'failed';
  if (error) {
    appStore.setError(error.message);
  } else {
    appStore.setError('Failed to do something exceptional');
  }
};
