import { action, makeAutoObservable, observable } from 'mobx';

import { fetchTodolists, TResponseTodolist } from '../api/todolists';
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
    });
  }

  changeTodolistFilter(filterValue: FilterType, todolistId: string): void {
    this.initialState = this.initialState.map(t =>
      t.id === todolistId ? { ...t, filter: filterValue } : t,
    );
  }

  changeTodolistTitle(title: string, todolistId: string): void {
    this.initialState = this.initialState.map(t =>
      t.id === todolistId ? { ...t, title } : t,
    );
  }

  removeTodolist(todolistId: string): void {
    this.initialState = this.initialState.filter(t => t.id !== todolistId);
  }

  addTodolist(title: string, todolistId: string): void {
    this.initialState = [
      {
        id: todolistId,
        title,
        addedDate: new Date().toISOString(),
        order: -111,
        filter: 'All',
      },
      ...this.initialState,
    ];
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
}

export default new Todolist();
