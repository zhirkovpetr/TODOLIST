import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterType} from "./App";

import './App.css';

type TaskType = {
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
  filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {title, tasks, addTask, deleteTask, changeTodolistFilter, changeTaskStatus, filter, todolistId, deleteTodolist} = props
  const [titleInput, setTitleInput] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim()) {
      setInputError(false)
    } else{
      setInputError(true)
    }
    setTitleInput(e.currentTarget.value)
  }

  const onAddTaskHandler = () => {
    const trimmedTitle = titleInput.trim()
    trimmedTitle ? addTask(trimmedTitle, todolistId) : setInputError(true)
    setTitleInput("");
  }

  const onAllFilterHandler = () => {
    changeTodolistFilter('All', todolistId)
  }

  const onCompletedFilterHandler = () => {
    changeTodolistFilter('Completed', todolistId)
  }

  const onActiveFilterHandler = () => {
    changeTodolistFilter('Active', todolistId)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTaskHandler()
    }
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
    return (
      <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <li ><input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
          <span>{task.title}</span>
          <button onClick={deleteTaskHandler}>x</button>
        </li>
      </div>
    )
  })

  return (
    <div className="App">
      <div>
        <h3>{title}<button onClick={onDeleteTodolistHandler}>x</button></h3>
        <div>
          <input
            className={inputError ? 'error' : ''}
            value={titleInput}
            onChange={onChangeTaskHandler}
            onKeyPress={onKeyPressHandler}/>
          <button onClick={onAddTaskHandler}>+</button>
          {inputError && <div className='error-message'>Field is required</div>}
        </div>
        <ul>
          {mapped}
        </ul>
        <div>
          <button className={filter === 'All' ? 'active-filter' : ''} onClick={() => onAllFilterHandler()}>All</button>
          <button className={filter === 'Active' ? 'active-filter' : ''} onClick={() => onActiveFilterHandler()}>Active</button>
          <button className={filter === 'Completed' ? 'active-filter' : ''} onClick={() => onCompletedFilterHandler()}>Completed</button>
        </div>
      </div>
    </div>
  );
}
