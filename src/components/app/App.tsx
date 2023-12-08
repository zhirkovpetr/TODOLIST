import React, { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import TodolistStore from '../../stores/todolist-store';
import { AddItemForm } from '../addItemForm';
import { Todolist } from '../todolist';

import './App.css';

export type FilterType = 'All' | 'Active' | 'Completed';

type TApp = {
  todolistsStore: TodolistStore;
};

export const App: React.FC<TApp> = observer(({ todolistsStore }) => {
  const addTodolistHandler = useCallback((title: string): void => {
    todolistsStore.createTodolist(title);
  }, []);

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
          {todolistsStore.todolists.map(todo => (
            <Grid item key={todo.id}>
              <Paper style={{ padding: '15px' }}>
                <Todolist todolist={todo} todolistsStore={todolistsStore} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
});
