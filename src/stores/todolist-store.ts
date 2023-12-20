import { makeAutoObservable, runInAction } from 'mobx';

import { fetchTodolists, TResponseTodolist } from '../api/todolists-api';
import { FilterType } from '../components/app/App';

import { appStore } from './index';

export type TodolistType = TResponseTodolist & {
  filter: FilterType;
  isTodolistsLoading: 'idle' | 'loading' | 'succeeded' | 'failed';
};

class TodolistStore {
  todolists: Array<TodolistType> = [];

  // taskStore: TaskStore;

  constructor() {
    makeAutoObservable(this);
    this.setTodolists();
    // this.taskStore = new TaskStore();
  }

  changeTodolistFilter(filterValue: FilterType, todolistId: string): void {
    this.todolists = this.todolists.map(t =>
      t.id === todolistId ? { ...t, filter: filterValue } : t,
    );
  }

  changeIsTodolistsLoading(
    isTodolistsLoading: 'idle' | 'loading' | 'succeeded' | 'failed',
    todolistId: string,
  ): void {
    this.todolists = this.todolists.map(t =>
      t.id === todolistId ? { ...t, isTodolistsLoading } : t,
    );
  }

  async setTodolists(): Promise<void> {
    appStore.status = 'loading';
    try {
      const data = await fetchTodolists.getTodolists();
      runInAction(() => {
        this.todolists = data.map(t => ({
          ...t,
          filter: 'All',
          isTodolistsLoading: 'idle',
        }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        appStore.status = 'succeeded';
      });
    }
  }

  async createTodolist(title: string): Promise<void> {
    appStore.status = 'loading';
    try {
      const { data, resultCode } = await fetchTodolists.createTodolist(title);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = [
            { ...data.item, filter: 'All', isTodolistsLoading: 'idle' },
            ...this.todolists,
          ];
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        appStore.status = 'succeeded';
      });
    }
  }

  async deleteTodolist(id: string): Promise<void> {
    this.changeIsTodolistsLoading('loading', id);
    appStore.setStatus('loading');
    try {
      const { resultCode } = await fetchTodolists.deleteTodolist(id);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = this.todolists.filter(t => t.id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.changeIsTodolistsLoading('succeeded', id);
        appStore.setStatus('succeeded');
      });
    }
  }

  async changeTodolistTitle(id: string, title: string): Promise<void> {
    this.changeIsTodolistsLoading('loading', id);
    try {
      const { resultCode } = await fetchTodolists.updateTodolistTitle(id, title);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = this.todolists.map(t => (t.id === id ? { ...t, title } : t));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.changeIsTodolistsLoading('succeeded', id);
      });
    }
  }
}

export default TodolistStore;
