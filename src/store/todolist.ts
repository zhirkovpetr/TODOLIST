import { action, makeAutoObservable, observable } from 'mobx';

import { fetchTodolists, TResponseTodolist } from '../api/todolists-api';
import { FilterType } from '../app/App';

export type TodolistType = TResponseTodolist & {
  filter: FilterType;
};

class Todolist {
  todolistId1 = crypto.randomUUID();

  todolistId2 = crypto.randomUUID();

  initialState: Array<TodolistType> = [];

  constructor() {
    makeAutoObservable(this, {
      initialState: observable,
      setTodolists: action,
      createTodolist: action,
    });
  }

  changeTodolistFilter(filterValue: FilterType, todolistId: string): void {
    this.initialState = this.initialState.map(t =>
      t.id === todolistId ? { ...t, filter: filterValue } : t,
    );
  }

  async setTodolists(): Promise<TResponseTodolist[]> {
    try {
      const res = await fetchTodolists.getTodolists();
      this.initialState = res.data.map(t => ({ ...t, filter: 'All' }));
      return this.initialState;
    } catch (error) {
      console.log(error);
      return this.initialState;
    }
  }

  async createTodolist(title: string): Promise<TResponseTodolist[]> {
    try {
      const data = await fetchTodolists.createTodolist(title);
      this.initialState = [{ ...data.data.item, filter: 'All' }, ...this.initialState];
      return this.initialState;
    } catch (error) {
      console.log(error);
      return this.initialState;
    }
  }

  async deleteTodolist(id: string): Promise<TResponseTodolist[]> {
    try {
      await fetchTodolists.deleteTodolist(id).then(() => {
        this.initialState = this.initialState.filter(t => t.id !== id);
      });
      return this.initialState;
    } catch (error) {
      console.log(error);
      return this.initialState;
    }
  }

  async changeTodolistTitle(id: string, title: string): Promise<TResponseTodolist[]> {
    try {
      await fetchTodolists.updateTodolistTitle(id, title).then(() => {
        this.initialState = this.initialState.map(t =>
          t.id === id ? { ...t, title } : t,
        );
      });
      return this.initialState;
    } catch (error) {
      console.log(error);
      return this.initialState;
    }
  }
}

export default new Todolist();
