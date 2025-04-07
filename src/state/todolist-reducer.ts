import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {useReducer} from "react";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistId01 = v1()
export const todolistId02 = v1()

const initialState :Array<TodolistType> =  [
    {id: todolistId01, title: "What to learn", filter: "all"},
    {id: todolistId02, title: "What to sale", filter: "all"}
];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(td => td.id != action.id)
        }

        case 'ADD-TODOLIST' : {
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            const newFilter = state.find(tl => tl.id === action.id)
            if (newFilter) {
                newFilter.filter = action.filter;
            }
            return [...state]
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}


