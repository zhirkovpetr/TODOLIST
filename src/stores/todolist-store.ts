import { makeAutoObservable, runInAction } from 'mobx';

import { fetchTodolists, TResponseTodolist } from '../api/todolists-api';
import { FilterType } from '../app/App';

export type TodolistType = TResponseTodolist & {
  filter: FilterType;
};

class TodolistStore {
  todolists: Array<TodolistType> = [];

  isTodolistsLoading: boolean = false;

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

  async setTodolists(): Promise<void> {
    this.isTodolistsLoading = true;
    try {
      const data = await fetchTodolists.getTodolists();
      runInAction(() => {
        this.todolists = data.map(t => ({ ...t, filter: 'All' }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isTodolistsLoading = false;
      });
    }
  }

  async createTodolist(title: string): Promise<void> {
    try {
      const { data, resultCode } = await fetchTodolists.createTodolist(title);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = [{ ...data.item, filter: 'All' }, ...this.todolists];
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodolist(id: string): Promise<void> {
    try {
      const { resultCode } = await fetchTodolists.deleteTodolist(id);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = this.todolists.filter(t => t.id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeTodolistTitle(id: string, title: string): Promise<void> {
    try {
      const { resultCode } = await fetchTodolists.updateTodolistTitle(id, title);
      if (resultCode === 0) {
        runInAction(() => {
          this.todolists = this.todolists.map(t => (t.id === id ? { ...t, title } : t));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodolistStore;
