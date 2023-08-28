import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = 'All' | 'Active' | 'Completed'

export const App = () => {
  let [tasks, setTasks] = useState([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: false},
  ])
  let [filter, setFilter] = useState<filterType>('All')

  let resultTasks = tasks

  const deleteTask = (id: number) => {
    setTasks(resultTasks.filter((t) => t.id !== id))
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
      <Todolist title={'What to learn'} tasks={resultTasks} deleteTask={deleteTask} changeFilter={changeFilter}/>
    </div>
  );
}
