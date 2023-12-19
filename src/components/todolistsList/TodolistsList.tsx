import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';

import TodolistStore from '../../stores/todolist-store';
import { Todolist } from '../todolist';

type TTodolistsListProps = {
  todolistsStore: TodolistStore;
};

export const TodolistsList: React.FC<TTodolistsListProps> = observer(
  ({ todolistsStore }) => (
    <>
      {todolistsStore.todolists.map(todo => (
        <Grid item key={todo.id}>
          <Paper style={{ padding: '15px' }}>
            <Todolist todolist={todo} todolistsStore={todolistsStore} />
          </Paper>
        </Grid>
      ))}
    </>
  ),
);
