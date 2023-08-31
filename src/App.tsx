import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'All' | 'Active' | 'Completed'

export const App = () => {
  let [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
    {id: v1(), title: 'React', isDone: false},
  ])
  let [filter, setFilter] = useState<filterType>('All')

  let resultTasks = tasks

  const deleteTask = (id: string) => {
    setTasks(resultTasks.filter((t) => t.id !== id))
  }

  const addTask = (title: string) => {
    setTasks([{id: v1(), title, isDone: false}, ...tasks])
  }


  if (filter === 'Active') {
    resultTasks = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'Completed') {
      resultTasks = tasks.filter((t) => t.isDone)
  }

  const changeFilter = (value: filterType) => {
    setFilter(value)
  }

  return (
    <div>
      <Todolist title={'What to learn'} tasks={resultTasks} addTask={addTask} deleteTask={deleteTask} changeFilter={changeFilter}/>
    </div>
  );
}
