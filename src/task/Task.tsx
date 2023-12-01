import React, { ChangeEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';

import { TaskPriorities, TaskStatuses, TTask } from '../api/tasks-api';
import { EditSpan } from '../editSpan/EditSpan';
import taskStore from '../stores/task-store';

type TTaskProps = {
  task: TTask;
};

export const Task: React.FC<TTaskProps> = observer(({ task }) => {
  const { todoListId, id } = task;

  const taskModel = {
    title: task.title,
    status: task.status,
    deadline: task.deadline,
    description: task.description,
    priority: TaskPriorities.Low,
    startDate: task.startDate,
  };

  const deleteTask = (): void => {
    taskStore.deleteTask(todoListId, id);
  };

  const onChangeTaskTitle = (newTitle: string): void => {
    taskStore.updateTask(todoListId, { ...taskModel, title: newTitle }, id);
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    taskStore.updateTask(
      id,
      {
        ...taskModel,
        status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      },
      todoListId,
    );
  };

  return (
    <div className={task.completed ? 'is-done' : ''}>
      <li>
        <Checkbox
          checked={task.completed}
          onChange={onChangeStatusHandler}
          size="small"
        />
        <EditSpan title={task.title} onChangeTitle={onChangeTaskTitle} />
        <IconButton onClick={deleteTask} aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </li>
    </div>
  );
});
