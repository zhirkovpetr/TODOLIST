import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {filterType} from "./App";

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  deleteTask: (deleteTask: string) => void
  changeFilter: (value: filterType) => void
  addTask: (title: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {
  const [titleInput, setTitleInput] = useState<string>('')
  const {title, tasks, addTask, deleteTask, changeFilter, changeStatus} = props

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value)
  }

  const onAddTaskHandler = () => {
    titleInput.trim() !== '' && addTask(titleInput.trim())
    setTitleInput('')
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
      <div key={task.id}>
        <li><input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
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
            value={titleInput}
            onChange={onChangeTaskHandler}
            onKeyPress={onKeyPressHandler}/>
          <button onClick={onAddTaskHandler}>+</button>
        </div>
        <ul>
          {mapped}
        </ul>
        <div>
          <button onClick={() => onAllFilterHandler()}>All</button>
          <button onClick={() => onActiveFilterHandler()}>Active</button>
          <button onClick={() => onCompletedFilterHandler()}>Completed</button>
        </div>
      </div>
    </div>
  );
}
