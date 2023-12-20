import React, { useCallback, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { observer } from 'mobx-react-lite';

import { filterTasks } from '../../shared/filterTasks';
import taskStore from '../../stores/task-store';
import TodolistStore, { TodolistType } from '../../stores/todolist-store';
import { AddItemForm } from '../addItemForm';
import { EditSpan } from '../editSpan';
import { Task } from '../task';
import '../app/App.css';

type TodolistPropsType = {
  todolist: TodolistType;
  todolistsStore: TodolistStore;
};

export const Todolist: React.FC<TodolistPropsType> = observer(props => {
  const { todolist, todolistsStore } = props;
  const { id, filter, title } = todolist;

  useEffect(() => {
    taskStore.setTasks(id);
  }, [id]);

  const onAllFilterHandler = (): void => {
    todolistsStore.changeTodolistFilter('All', id);
  };

  const onCompletedFilterHandler = (): void => {
    todolistsStore.changeTodolistFilter('Completed', id);
  };

  const onActiveFilterHandler = (): void => {
    todolistsStore.changeTodolistFilter('Active', id);
  };

  const onDeleteTodolistHandler = (): void => {
    todolistsStore.deleteTodolist(id);
  };

  const addTaskHandler = useCallback((newTitle: string): void => {
    taskStore.createTask(id, newTitle);
  }, []);

  const onChangeTodolistTitle = useCallback(
    (newTodolistTitle: string): void => {
      todolistsStore.changeTodolistTitle(id, newTodolistTitle);
    },
    [id],
  );
  console.log(todolist.isTodolistsLoading);
  return (
    <div className="App">
      <div>
        <h3>
          <EditSpan
            title={title}
            onChangeTitle={onChangeTodolistTitle}
            disabled={todolist.isTodolistsLoading === 'loading'}
          />
          <IconButton
            aria-label="delete"
            size="large"
            onClick={onDeleteTodolistHandler}
            disabled={todolist.isTodolistsLoading === 'loading'}
          >
            <DeleteIcon />
          </IconButton>
        </h3>
        <AddItemForm
          addItem={addTaskHandler}
          disabled={todolist.isTodolistsLoading === 'loading'}
        />
        <ul>
          {filterTasks(taskStore.tasks[id], filter).map(t => (
            <Task key={t.id} task={t} />
          ))}
        </ul>
        <div>
          <Button
            variant={filter === 'All' ? 'contained' : 'text'}
            color="error"
            onClick={onAllFilterHandler}
          >
            All
          </Button>
          <Button
            color="primary"
            variant={filter === 'Active' ? 'contained' : 'text'}
            onClick={onActiveFilterHandler}
          >
            Active
          </Button>
          <Button
            color="secondary"
            variant={filter === 'Completed' ? 'contained' : 'text'}
            onClick={onCompletedFilterHandler}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
});
