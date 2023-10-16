import { TaskStateType } from '../App';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
const REMOVE_TODOLIST_TASK = 'REMOVE-TODOLIST-TASK';
const ADD_TODOLIST_TASK = 'ADD-TODOLIST-TASK';

type RemoveTaskType = ReturnType<typeof RemoveTaskAC>;
type AddTaskType = ReturnType<typeof AddTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof ChangeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof ChangeTaskTitleAC>;
type RemoveTodolistTaskType = ReturnType<typeof RemoveTodolistTaskAC>;
type AddTodolistTaskType = ReturnType<typeof AddTodolistTaskAC>;

type ActionType =
  | RemoveTaskType
  | AddTaskType
  | ChangeTaskStatusType
  | RemoveTodolistTaskType
  | AddTodolistTaskType
  | ChangeTaskTitleType;

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
  switch (action.type) {
    case REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          task => task.id !== action.payload.id,
        ),
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        [action.payload.todolistId]: [
          { id: crypto.randomUUID(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistId],
        ],
      };
    }
    case CHANGE_TASK_STATUS: {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
          task.id === action.payload.id
            ? { ...task, isDone: action.payload.isDone }
            : { ...task },
        ),
      };
    }
    case CHANGE_TASK_TITLE: {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : { ...task },
        ),
      };
    }
    case REMOVE_TODOLIST_TASK: {
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    }
    case ADD_TODOLIST_TASK: {
      return { ...state, [action.payload.newTodolistId]: [] };
    }
    default: {
      return state;
    }
  }
};

export const RemoveTaskAC = (id: string, todolistId: string) =>
  ({
    type: REMOVE_TASK,
    payload: { id, todolistId },
  } as const);

export const AddTaskAC = (title: string, todolistId: string) =>
  ({
    type: ADD_TASK,
    payload: { title, todolistId },
  } as const);

export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) =>
  ({
    type: CHANGE_TASK_STATUS,
    payload: { id, isDone, todolistId },
  } as const);

export const ChangeTaskTitleAC = (id: string, title: string, todolistId: string) =>
  ({
    type: CHANGE_TASK_TITLE,
    payload: { id, title, todolistId },
  } as const);

export const RemoveTodolistTaskAC = (id: string) =>
  ({ type: REMOVE_TODOLIST_TASK, payload: { id } } as const);

export const AddTodolistTaskAC = (newTodolistId: string) =>
  ({ type: ADD_TODOLIST_TASK, payload: { newTodolistId } } as const);
