import React, { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { appStore } from '../../stores';
import TodolistStore from '../../stores/todolist-store';
import { AddItemForm } from '../addItemForm';
import { CustomizedSnackbars } from '../errorSnackBar';
import { TodolistsList } from '../todolistsList';

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
      <CustomizedSnackbars />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODOLIST
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        {appStore.status === 'loading' && (
          <LinearProgress /* variant="determinate" value={progress} */ />
        )}
      </Box>
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <AddItemForm addItem={addTodolistHandler} />
        </Grid>
        <Grid container spacing={10}>
          <TodolistsList todolistsStore={todolistsStore} />
        </Grid>
      </Container>
    </div>
  );
});
