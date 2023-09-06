import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = 'All' | 'Active' | 'Completed'

export const App = () => {
  let [tasks, setTasks] = useState([
    {id: crypto.randomUUID(), title: 'HTML', isDone: true},
    {id: crypto.randomUUID(), title: 'JS', isDone: false},
    {id: crypto.randomUUID(), title: 'React', isDone: false},
  ])
  let [filter, setFilter] = useState<FilterType>('All')

  let resultTasks = tasks

  const deleteTask = (id: string) => {
    setTasks(resultTasks.filter((t) => t.id !== id))
  }

  const addTask = (title: string) => {
    setTasks([{id: crypto.randomUUID(), title, isDone: false}, ...tasks])
  }


  if (filter === 'Active') {
    resultTasks = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'Completed') {
    resultTasks = tasks.filter((t) => t.isDone)
  }

  const changeFilter = (value: FilterType) => {
    setFilter(value)
  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === taskId)
    task && (task.isDone = isDone)
    return setTasks([...tasks])
  }

  return (
    <div>
      <Todolist
        title={'What to learn'}
        tasks={resultTasks}
        filter={filter}
        addTask={addTask}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
        changeFilter={changeFilter}/>
    </div>
  );
}
