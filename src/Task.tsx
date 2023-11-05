import React, { memo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import { EditSpan } from './EditSpan';
import { TaskType } from './Todolist';
import { useTask } from './useTask';

type TTaskProps = {
  task: TaskType;
  todolistId: string;
  deleteTask: (deleteTask: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};

export const Task: React.FC<TTaskProps> = memo(props => {
  const { task, todolistId, deleteTask, changeTaskStatus, changeTaskTitle } = props;

  const { deleteTaskHandler, onChangeStatusHandler, onChangeTaskTitle } = useTask({
    task,
    todolistId,
    deleteTask,
    changeTaskStatus,
    changeTaskTitle,
  });

  return (
    <div className={task.isDone ? 'is-done' : ''}>
      <li>
        <Checkbox checked={task.isDone} onChange={onChangeStatusHandler} size="small" />
        <EditSpan title={task.title} onChangeTitle={onChangeTaskTitle} />
        <IconButton onClick={deleteTaskHandler} aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </li>
    </div>
  );
});
