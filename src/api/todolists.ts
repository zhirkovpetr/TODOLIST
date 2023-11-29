import { instance } from './instance';

export type TResponseTodolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export const fetchTodolists = {
  getTodolists() {
    return instance.get<TResponseTodolist[]>('todo-lists');
  },
};
