import React, { memo, useCallback } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';

import { AddItemForm } from './AddItemForm';
import { FilterType } from './App';
import { EditSpan } from './EditSpan';
import { Task } from './Task';
import { useTodolist } from './useTodolist';

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
  filter: FilterType;
  deleteTask: (deleteTask: string, todolistId: string) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTodolistFilter: (value: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = memo(
  observer(props => {
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

    const {
      onAllFilterHandler,
      onCompletedFilterHandler,
      onActiveFilterHandler,
      onDeleteTodolistHandler,
    } = useTodolist({ changeTodolistFilter, deleteTodolist, todolistId });

    let resultTasks = tasks;

    if (filter === 'Active') {
      resultTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'Completed') {
      resultTasks = tasks.filter(t => t.isDone);
    }

    const mapped = resultTasks.map(t => (
      <Task
        key={t.id}
        task={t}
        changeTaskTitle={changeTaskTitle}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        todolistId={todolistId}
      />
    ));

    const addTaskHandler = useCallback(
      (newTaskTitle: string): void => {
        addTask(newTaskTitle, todolistId);
      },
      [addTask, todolistId],
    );

    const onChangeTodolistTitle = useCallback(
      (newTodolistTitle: string): void => {
        changeTodolistTitle(newTodolistTitle, todolistId);
      },
      [changeTodolistTitle, todolistId],
    );

    return (
      <div className="App">
        <div>
          <h3>
            <EditSpan title={title} onChangeTitle={onChangeTodolistTitle} />
            <IconButton
              aria-label="delete"
              size="large"
              onClick={onDeleteTodolistHandler}
            >
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
  }),
);
