import { makeAutoObservable } from 'mobx';

import { FilterType, TodolistType } from '../App';

class Todolist {
  todolistId1 = crypto.randomUUID();

  todolistId2 = crypto.randomUUID();

  initialState: Array<TodolistType> = [
    { id: this.todolistId1, title: 'What to learn', filter: 'All' },
    { id: this.todolistId2, title: 'What to buy', filter: 'All' },
  ];

  constructor() {
    makeAutoObservable(this);
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
        filter: 'All',
      },
      ...this.initialState,
    ];
  }
}

export default new Todolist();
