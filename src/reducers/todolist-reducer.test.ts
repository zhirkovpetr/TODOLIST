import crypto from "crypto"
import {FilterType, TodolistType} from '../App'
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistReducer
} from "./todolist-reducer";

test('correct filter of todolist should be changed', () => {
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newFilter: FilterType = 'Completed'

  const startState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})

test('correct todolist should be removed', () => {
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  const startState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle, todolistId1))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})
