import { instance } from './instance';

export type TasksStateType = {
  [key: string]: TTask[];
};

export type TResponseTask = {
  items: TTask[];
  totalCount: string;
  error: string;
};

export type TTask = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateDomainTaskModelType = {
  title: string;
  description?: string;
  status?: TaskStatuses;
  completed?: boolean;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TResponse<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export const fetchTask = {
  getTasks(todolistId: string) {
    return instance
      .get<TResponseTask>(`todo-lists/${todolistId}/tasks`)
      .then(res => res.data);
  },
  createTask(todolistId: string, title: string) {
    return instance
      .post<TResponse<{ item: TTask }>>(`todo-lists/${todolistId}/tasks`, { title })
      .then(res => res.data);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance
      .delete<TResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
      .then(res => res.data);
  },
  updateTask(todolistId: string, model: UpdateDomainTaskModelType, taskId: string) {
    return instance
      .put<TResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
      .then(res => res.data);
  },
};
