import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterType} from "./App";

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  deleteTask: (deleteTask: string) => void
  changeFilter: (value: FilterType) => void
  addTask: (title: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
  filter: FilterType
}

export const Todolist = (props: TodolistPropsType) => {

  const {title, tasks, addTask, deleteTask, changeFilter, changeStatus, filter} = props
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
    trimmedTitle ? addTask(trimmedTitle) : setInputError(true)
    setTitleInput("");
  }

  const onAllFilterHandler = () => {
    changeFilter('All')
  }

  const onCompletedFilterHandler = () => {
    changeFilter('Completed')
  }

  const onActiveFilterHandler = () => {
    changeFilter('Active')
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTaskHandler()
    }
  }

  const mapped = tasks.map((task) => {
    const deleteTaskHandler = () => {
      deleteTask(task.id)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeStatus(task.id, e.currentTarget.checked)
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
        <h3>{title}</h3>
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
