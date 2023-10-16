import React, { useReducer } from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AddItemForm } from './AddItemForm';
import {
  AddTaskAC,
  AddTodolistTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  RemoveTodolistTaskAC,
  tasksReducer,
} from './reducers/task-reducer';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistReducer,
} from './reducers/todolist-reducer';
import { TaskType, Todolist } from './Todolist';

import './App.css';

export type FilterType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

export const App: React.FC = () => {
  const todolistId1 = crypto.randomUUID();
  const todolistId2 = crypto.randomUUID();

  const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML', isDone: true },
      { id: crypto.randomUUID(), title: 'CSS', isDone: false },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'bread', isDone: false },
      { id: crypto.randomUUID(), title: 'milk', isDone: true },
      { id: crypto.randomUUID(), title: 'water', isDone: true },
      { id: crypto.randomUUID(), title: 'coffee', isDone: false },
    ],
  });

  const changeTodolistFilter = (value: FilterType, todolistId: string): void => {
    dispatchTodolists(ChangeTodolistFilterAC(value, todolistId));
  };

  const deleteTask = (id: string, todolistId: string): void => {
    dispatchTasks(RemoveTaskAC(id, todolistId));
  };

  const removeTodolist = (todolistId: string): void => {
    dispatchTodolists(RemoveTodolistAC(todolistId));
    dispatchTasks(RemoveTodolistTaskAC(todolistId));
  };

  const addTask = (title: string, todolistId: string): void => {
    dispatchTasks(AddTaskAC(title, todolistId));
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ): void => {
    dispatchTasks(ChangeTaskStatusAC(taskId, isDone, todolistId));
  };

  const addTodolistHandler = (title: string): void => {
    const todolistId = crypto.randomUUID();
    dispatchTodolists(AddTodolistAC(title, todolistId));
    dispatchTasks(AddTodolistTaskAC(title, todolistId));
  };

  const changeTodolistTitle = (title: string, todolistId: string): void => {
    dispatchTodolists(ChangeTodolistTitleAC(title, todolistId));
  };

  const changeTaskTitle = (taskId: string, title: string, todolistId: string): void => {
    dispatchTasks(ChangeTaskTitleAC(taskId, title, todolistId));
  };

  return (
    <div className="todolist-block">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODOLIST
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <AddItemForm addItem={addTodolistHandler} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map(todolist => {
            let resultTasks = tasks[todolist.id];

            if (todolist.filter === 'Active') {
              resultTasks = resultTasks.filter(t => !t.isDone);
            }
            if (todolist.filter === 'Completed') {
              resultTasks = resultTasks.filter(t => t.isDone);
            }

            return (
              <Grid item key={todolist.id}>
                <Paper style={{ padding: '15px' }}>
                  <Todolist
                    todolistId={todolist.id}
                    title={todolist.title}
                    tasks={resultTasks}
                    filter={todolist.filter}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTodolistFilter={changeTodolistFilter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
