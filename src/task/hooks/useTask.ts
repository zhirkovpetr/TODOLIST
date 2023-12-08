import { ChangeEvent, useCallback } from 'react';

import { TaskStatuses, TTask } from '../../api/tasks-api';

type TUseTaskProps = {
  task: TTask;
  todolistId: string;
  deleteTask: (deleteTask: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};

type TReturnUseTask = {
  deleteTaskHandler: () => void;
  onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTaskTitle: (newTitle: string) => void;
};

export const useTask = (props: TUseTaskProps): TReturnUseTask => {
  const { task, changeTaskStatus, changeTaskTitle, deleteTask, todolistId } = props;

  const deleteTaskHandler = (): void => {
    deleteTask(task.id, todolistId);
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    changeTaskStatus(
      task.id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      todolistId,
    );
  };

  const onChangeTaskTitle = useCallback(
    (newTitle: string): void => {
      changeTaskTitle(task.id, newTitle, todolistId);
    },
    [changeTaskTitle, task.id, todolistId],
  );

  return {
    deleteTaskHandler,
    onChangeStatusHandler,
    onChangeTaskTitle,
  };
};
