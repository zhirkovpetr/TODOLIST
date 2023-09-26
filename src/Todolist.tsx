import React, {ChangeEvent} from 'react';

import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";

import './App.css';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  deleteTask: (deleteTask: string, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistFilter: (value: FilterType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
  filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
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
    changeTodolistTitle
  } = props

  const onAllFilterHandler = () => {
    changeTodolistFilter('All', todolistId)
  }

  const onCompletedFilterHandler = () => {
    changeTodolistFilter('Completed', todolistId)
  }

  const onActiveFilterHandler = () => {
    changeTodolistFilter('Active', todolistId)
  }

  const onDeleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const mapped = tasks.map((task) => {
    const deleteTaskHandler = () => {
      deleteTask(task.id, todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    }
    const onChangeTaskTitle = (newTitle: string) => {
      changeTaskTitle(task.id, newTitle, todolistId)
    }
    return (
      <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <li><input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
          <EditSpan title={task.title} onChangeTitle={onChangeTaskTitle}/>
          <button onClick={deleteTaskHandler}>x</button>
        </li>
      </div>
    )
  })

  const addTaskHandler = (title: string) => {
    addTask(title, todolistId)
  }

  const onChangeTodolistTitle = (title: string) => {
    changeTodolistTitle(title, todolistId)
  }

  return (
    <div className="App">
      <div>
        <h3>
          <EditSpan title={title} onChangeTitle={onChangeTodolistTitle}/>
          <button onClick={onDeleteTodolistHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
          {mapped}
        </ul>
        <div>
          <button className={filter === 'All' ? 'active-filter' : ''} onClick={() => onAllFilterHandler()}>All</button>
          <button
            className={filter === 'Active' ? 'active-filter' : ''} onClick={() => onActiveFilterHandler()}>Active
          </button>
          <button
            className={filter === 'Completed' ? 'active-filter' : ''}
            onClick={() => onCompletedFilterHandler()}>Completed
          </button>
        </div>
      </div>
    </div>
  );
}
