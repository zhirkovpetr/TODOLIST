import React from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { AddItemForm } from './AddItemForm';
import task from './store/task';
import todolist from './store/todolist';
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

export const App: React.FC = observer(() => {
  const changeTodolistFilter = (value: FilterType, todolistId: string): void => {
    todolist.changeTodolistFilter(value, todolistId);
  };

  const deleteTask = (id: string, todolistId: string): void => {
    task.removeTask(id, todolistId);
  };

  const removeTodolist = (todolistId: string): void => {
    todolist.removeTodolist(todolistId);
  };

  const addTask = (title: string, todolistId: string): void => {
    task.addTask(title, todolistId);
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ): void => {
    task.changeTaskStatus(taskId, isDone, todolistId);
  };

  const addTodolistHandler = (title: string): void => {
    const todolistId = crypto.randomUUID();
    todolist.addTodolist(title, todolistId);
    task.addTaskForTodolist(todolistId);
  };

  const changeTodolistTitle = (title: string, todolistId: string): void => {
    todolist.changeTodolistTitle(title, todolistId);
  };

  const changeTaskTitle = (taskId: string, title: string, todolistId: string): void => {
    task.changeTaskTitle(taskId, title, todolistId);
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
          {todolist.initialState.map(todo => {
            let resultTasks = task.initialState[todo.id];

            if (todo.filter === 'Active') {
              resultTasks = resultTasks.filter(t => !t.isDone);
            }
            if (todo.filter === 'Completed') {
              resultTasks = resultTasks.filter(t => t.isDone);
            }

            return (
              <Grid item key={todo.id}>
                <Paper style={{ padding: '15px' }}>
                  <Todolist
                    todolistId={todo.id}
                    title={todo.title}
                    tasks={resultTasks}
                    filter={todo.filter}
                    deleteTask={deleteTask}
                    addTask={addTask}
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
});
