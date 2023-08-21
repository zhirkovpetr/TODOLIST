import React from 'react';
import './App.css';

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
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
                <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
              </div>
            )
          })}

        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
}
