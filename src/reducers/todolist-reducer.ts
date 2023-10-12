import {FilterType, TodolistType} from "../App";

const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
type RemoveTodolistType = ReturnType<typeof RemoveTodolistAC>
type AddTodolistType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>

type ActionType = ChangeTodolistFilterType | RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case CHANGE_TODOLIST_FILTER: {
      return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
    }
    case REMOVE_TODOLIST: {
      return state.filter(t => t.id !== action.payload.todolistId)
    }
    case ADD_TODOLIST: {
      return [{id: action.payload.todolistId, title: action.payload.title, filter: 'All'}, ...state]
    }
    case CHANGE_TODOLIST_TITLE: {
      return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.title} : t)
    }
    default:
      return state
  }
}

export const ChangeTodolistFilterAC = (filter: FilterType, todolistId: string) => {
  return {
    type: CHANGE_TODOLIST_FILTER, payload: {filter, todolistId}
  } as const
}

export const RemoveTodolistAC = (todolistId: string) => {
  return {
    type: REMOVE_TODOLIST, payload: {todolistId}
  } as const
}

export const AddTodolistAC = (title: string, todolistId: string) => {
  return {
    type: ADD_TODOLIST, payload: {title, todolistId}
  } as const
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string) => {
  return {
    type: CHANGE_TODOLIST_TITLE, payload: {title, todolistId}
  } as const
}
