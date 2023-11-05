import { useCallback } from 'react';

import { FilterType } from './App';
import task from './store/task';
import todolist from './store/todolist';

type TReturnUseApp = {
  changeTodolistFilter: (value: FilterType, todolistId: string) => void;
  deleteTask: (deleteTask: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  addTodolistHandler: (title: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};

export const useApp = (): TReturnUseApp => {
  const changeTodolistFilter = useCallback(
    (value: FilterType, todolistId: string): void => {
      todolist.changeTodolistFilter(value, todolistId);
    },
    [],
  );

  const deleteTask = useCallback((id: string, todolistId: string): void => {
    task.removeTask(id, todolistId);
  }, []);

  const removeTodolist = useCallback((todolistId: string): void => {
    todolist.removeTodolist(todolistId);
  }, []);

  const addTask = useCallback((title: string, todolistId: string): void => {
    task.addTask(title, todolistId);
  }, []);

  const changeTaskStatus = useCallback(
    (taskId: string, isDone: boolean, todolistId: string): void => {
      task.changeTaskStatus(taskId, isDone, todolistId);
    },
    [],
  );

  const addTodolistHandler = useCallback((title: string): void => {
    const todolistId = crypto.randomUUID();
    todolist.addTodolist(title, todolistId);
    task.addTaskForTodolist(todolistId);
  }, []);

  const changeTodolistTitle = useCallback((title: string, todolistId: string): void => {
    todolist.changeTodolistTitle(title, todolistId);
  }, []);

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string): void => {
      task.changeTaskTitle(taskId, title, todolistId);
    },
    [],
  );
  return {
    changeTodolistFilter,
    deleteTask,
    removeTodolist,
    addTask,
    changeTaskStatus,
    addTodolistHandler,
    changeTodolistTitle,
    changeTaskTitle,
  };
};
