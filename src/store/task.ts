import { makeAutoObservable } from 'mobx';

import { TaskStateType } from '../app/App';

import todolist from './todolist';

class Task {
  initialState: TaskStateType = {
    [todolist.todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML', isDone: true },
      { id: crypto.randomUUID(), title: 'CSS', isDone: false },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
    ],
    [todolist.todolistId2]: [
      { id: crypto.randomUUID(), title: 'bread', isDone: false },
      { id: crypto.randomUUID(), title: 'milk', isDone: true },
      { id: crypto.randomUUID(), title: 'water', isDone: true },
      { id: crypto.randomUUID(), title: 'coffee', isDone: false },
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  addTaskForTodolist(todolistId: string): void {
    this.initialState = {
      ...this.initialState,
      [todolistId]: [],
    };
  }

  addTask(newTaskTitle: string, todolistId: string): void {
    this.initialState = {
      ...this.initialState,
      [todolistId]: [
        { id: crypto.randomUUID(), title: newTaskTitle, isDone: false },
        ...this.initialState[todolistId],
      ],
    };
  }

  removeTask(taskId: string, todolistId: string): void {
    this.initialState = {
      ...this.initialState,
      [todolistId]: this.initialState[todolistId].filter(task => task.id !== taskId),
    };
  }

  changeTaskTitle(taskId: string, newTitle: string, todolistId: string): void {
    this.initialState = {
      ...this.initialState,
      [todolistId]: this.initialState[todolistId].map(task =>
        task.id === taskId ? { ...task, title: newTitle } : { ...task },
      ),
    };
  }

  changeTaskStatus(taskId: string, isDone: boolean, todolistId: string): void {
    this.initialState = {
      ...this.initialState,
      [todolistId]: this.initialState[todolistId].map(task =>
        task.id === taskId ? { ...task, isDone } : { ...task },
      ),
    };
  }
}

export default new Task();
