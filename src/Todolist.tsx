import React from 'react';
import './App.css';
import {filterType} from "./App";

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  deleteTask: (deleteTask: number)=> void
  changeFilter: (value: filterType)=> void
}

export const Todolist = (props: TodolistPropsType) => {
  const{title, tasks} = props
  return (
    <div className="App">
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {tasks.map((task, index)=> {
            return (
              <div key={index}>
                <li><input type="checkbox" checked={task.isDone}/>
                  <span>{task.title}</span>
                  <button onClick={()=> props.deleteTask(task.id)}>x</button>
                </li>
              </div>
            )
          })}

        </ul>
        <div>
          <button onClick={()=> props.changeFilter('All')}>All</button>
          <button onClick={()=> props.changeFilter('Active')}>Active</button>
          <button onClick={()=> props.changeFilter('Completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
}
