import React, {useState} from 'react';
import './App.css';

import {Todolist} from "./Todolist";

export type FilterType = 'All' | 'Active' | 'Completed'

type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

export const App: React.FC = () => {
  const todolistId1 = crypto.randomUUID()
  const todolistId2 = crypto.randomUUID()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistId1, title: 'What to learn ?', filter: 'All'},
    {id: todolistId2, title: 'What to buy ?', filter: 'Active'},
  ])

  let [tasks, setTasks] = useState({
    [todolistId1]: [
      {id: crypto.randomUUID(), title: 'HTML', isDone: true},
      {id: crypto.randomUUID(), title: 'CSS', isDone: false},
      {id: crypto.randomUUID(), title: 'JS', isDone: true},
      {id: crypto.randomUUID(), title: 'React', isDone: false}
    ],
    [todolistId2]: [
      {id: crypto.randomUUID(), title: 'bread', isDone: false},
      {id: crypto.randomUUID(), title: 'milk', isDone: true},
      {id: crypto.randomUUID(), title: 'water', isDone: true},
      {id: crypto.randomUUID(), title: 'coffee', isDone: false},
    ]
  })

  const changeTodolistFilter = (value: FilterType, todolistId: string) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
      ...todolist,
      filter: value
    } : {...todolist}))
  }

  const deleteTask = (id: string, todolistId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
  }

  const addTask = (title: string, todolistId: string) => {
    setTasks({...tasks, [todolistId]: [{id: crypto.randomUUID(), title, isDone: false}, ...tasks[todolistId]]})
  }


  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : {...task})
    })
  }

  return (
    <div>
      {todolists.map((todolist) => {
        let resultTasks = tasks[todolist.id]

        if (todolist.filter === 'Active') {
          resultTasks = resultTasks.filter((t) => !t.isDone)
        }
        if (todolist.filter === 'Completed') {
          resultTasks = resultTasks.filter((t) => t.isDone)
        }

        return (
            <Todolist
              key={todolist.id}
              todolistId={todolist.id}
              title={todolist.title}
              tasks={resultTasks}
              filter={todolist.filter}
              addTask={addTask}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
              deleteTodolist={deleteTodolist}
              changeTodolistFilter={changeTodolistFilter}/>
        )
      })}
    </div>
  );
}
