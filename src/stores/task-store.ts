import { makeAutoObservable, runInAction } from 'mobx';

import { fetchTask, TasksStateType, UpdateDomainTaskModelType } from '../api/tasks-api';
import { handleServerAppError, handleServerNetworkError } from '../shared/error-tils';

import { appStore } from './index';

class TaskStore {
  tasks: TasksStateType = {};

  constructor() {
    makeAutoObservable(this);
  }

  async setTasks(todolistId: string): Promise<void> {
    appStore.status = 'loading';
    try {
      const data = await fetchTask.getTasks(todolistId);
      runInAction(() => {
        this.tasks = {
          ...this.tasks,
          [todolistId]: data.items,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        appStore.status = 'succeeded';
      });
    }
  }

  async createTask(todolistId: string, title: string): Promise<void> {
    appStore.status = 'loading';
    try {
      const data = await fetchTask.createTask(todolistId, title);
      if (data.resultCode === 0) {
        runInAction(() => {
          this.tasks = {
            ...this.tasks,
            [todolistId]: [data.data.item, ...this.tasks[todolistId]],
          };
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

  async deleteTask(todolistId: string, taskId: string): Promise<void> {
    try {
      await fetchTask.deleteTask(todolistId, taskId);
      runInAction(() => {
        this.tasks = {
          ...this.tasks,
          [todolistId]: this.tasks[todolistId].filter(task => task.id !== taskId),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(
    todolistId: string,
    domainModel: UpdateDomainTaskModelType,
    taskId: string,
  ): Promise<void> {
    try {
      const data = await fetchTask.updateTask(todolistId, domainModel, taskId);
      if (data.resultCode === 0) {
        runInAction(() => {
          this.tasks = {
            ...this.tasks,
            [todolistId]: this.tasks[todolistId].map(t =>
              t.id === taskId ? { ...t, ...domainModel } : t,
            ),
          };
        });
      } else {
        handleServerAppError(data);
      }
    } catch (error) {
      runInAction(() => {
        appStore.status = 'failed';
        if (error instanceof Error) {
          appStore.setError(error.message);
        } else {
          appStore.setError('Failed to do something exceptional');
        }
      });
    }
  }
}

export default new TaskStore();
