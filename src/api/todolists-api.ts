import { instance } from './instance';

export type TResponseTodolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TResponse<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

type TData = {
  item: TItem;
};

type TItem = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export const fetchTodolists = {
  getTodolists() {
    return instance.get<TResponseTodolist[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<TResponse<TData>>('todo-lists', { title }).then(res => res.data);
  },
  deleteTodolist(id: string) {
    return instance.delete<TResponse>(`todo-lists/${id}`).then(res => res.data);
  },
  updateTodolistTitle(id: string, title: string) {
    return instance.put<TResponse>(`todo-lists/${id}`, { title }).then(res => res.data);
  },
};
