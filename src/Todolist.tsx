import React, { ChangeEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import { AddItemForm } from './AddItemForm';
import { FilterType } from './App';
import { EditSpan } from './EditSpan';

import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  deleteTask: (deleteTask: string, todolistId: string) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTodolistFilter: (value: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
  filter: FilterType;
};

export const Todolist: React.FC<TodolistPropsType> = props => {
  const {
    title,
    tasks,
    addTask,
    deleteTask,
    changeTodolistFilter,
    changeTaskStatus,
    filter,
    todolistId,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props;

  const onAllFilterHandler = (): void => {
    changeTodolistFilter('All', todolistId);
  };

  const onCompletedFilterHandler = (): void => {
    changeTodolistFilter('Completed', todolistId);
  };

  const onActiveFilterHandler = (): void => {
    changeTodolistFilter('Active', todolistId);
  };

  const onDeleteTodolistHandler = (): void => {
    deleteTodolist(todolistId);
  };

  const mapped = tasks.map(task => {
    const deleteTaskHandler = (): void => {
      deleteTask(task.id, todolistId);
    };
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      changeTaskStatus(task.id, e.currentTarget.checked, todolistId);
    };
    const onChangeTaskTitle = (newTitle: string): void => {
      changeTaskTitle(task.id, newTitle, todolistId);
    };
    return (
      <div key={task.id} className={task.isDone ? 'is-done' : ''}>
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

  const addTaskHandler = (newTaskTitle: string): void => {
    addTask(newTaskTitle, todolistId);
  };

  const onChangeTodolistTitle = (newTodolistTitle: string): void => {
    changeTodolistTitle(newTodolistTitle, todolistId);
  };

  return (
    <div className="App">
      <div>
        <h3>
          <EditSpan title={title} onChangeTitle={onChangeTodolistTitle} />
          <IconButton aria-label="delete" size="large" onClick={onDeleteTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler} />
        <ul>{mapped}</ul>
        <div>
          <Button
            variant={filter === 'All' ? 'contained' : 'text'}
            color="error"
            onClick={() => onAllFilterHandler()}
          >
            All
          </Button>
          <Button
            color="primary"
            variant={filter === 'Active' ? 'contained' : 'text'}
            onClick={() => onActiveFilterHandler()}
          >
            Active
          </Button>
          <Button
            color="secondary"
            variant={filter === 'Completed' ? 'contained' : 'text'}
            onClick={() => onCompletedFilterHandler()}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};
