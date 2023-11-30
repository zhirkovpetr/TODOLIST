import React, { useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { AddItemForm } from '../addItemForm/AddItemForm';
import task from '../store/task';
import todolist from '../store/todolist';
import { TaskType, Todolist } from '../todolist/Todolist';

import { useApp } from './hooks/useApp';

import './App.css';

export type FilterType = 'All' | 'Active' | 'Completed';

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

export const App: React.FC = observer(() => {
  useEffect(() => {
    todolist.setTodolists().then(res => res);
  }, []);

  const {
    changeTodolistFilter,
    deleteTask,
    removeTodolist,
    addTask,
    changeTaskStatus,
    addTodolistHandler,
    changeTodolistTitle,
    changeTaskTitle,
  } = useApp();

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
            const resultTasks = task.initialState[todo.id];

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
