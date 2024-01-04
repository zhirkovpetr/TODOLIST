import React, { useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';

import { todolistsStore } from '../../stores';
import { AddItemForm } from '../addItemForm';
import { Todolist } from '../todolist';

export const TodolistsList: React.FC = observer(() => {
  const addTodolistHandler = useCallback((title: string): void => {
    todolistsStore.createTodolist(title);
  }, []);

  return (
    <>
      <Grid container style={{ padding: '10px 0' }}>
        <Paper style={{ padding: '15px' }}>
          <AddItemForm addItem={addTodolistHandler} />
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
