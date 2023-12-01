import { makeAutoObservable, runInAction } from 'mobx';

import { fetchTask, TasksStateType, UpdateDomainTaskModelType } from '../api/tasks-api';

class TaskStore {
  tasks: TasksStateType = {};

  constructor() {
    makeAutoObservable(this);
  }

  async setTasks(todolistId: string): Promise<void> {
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
    }
  }

  async createTask(todolistId: string, title: string): Promise<void> {
    try {
      const data = await fetchTask.createTask(todolistId, title);
      runInAction(() => {
        this.tasks = {
          ...this.tasks,
          [todolistId]: [data.data.item, ...this.tasks[todolistId]],
        };
      });
    } catch (error) {
      console.log(error);
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
      await fetchTask.updateTask(todolistId, domainModel, taskId);
      runInAction(() => {
        const tasks = this.tasks[todolistId];
        const index = tasks.findIndex(t => t.id === taskId);
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...domainModel };
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TaskStore();
