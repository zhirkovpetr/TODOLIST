import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { loginStore, todolistsStore } from '../../stores';
import { AddItemForm } from '../addItemForm';
import { Todolist } from '../todolist';

export const TodolistsList: React.FC = observer(() => {
  useEffect(() => {
    todolistsStore.setTodolists();
  }, []);

  const addTodolistHandler = useCallback((title: string): void => {
    todolistsStore.createTodolist(title);
  }, []);

  if (!loginStore.login.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '10px 0' }}>
        <Paper style={{ padding: '15px' }}>
          <AddItemForm addItem={addTodolistHandler} disabled={false} />
        </Paper>
      </Grid>
      <Grid container spacing={10}>
        {todolistsStore.todolists.map(todo => (
          <Grid item key={todo.id}>
            <Paper style={{ padding: '15px' }}>
              <Todolist todolist={todo} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
});
