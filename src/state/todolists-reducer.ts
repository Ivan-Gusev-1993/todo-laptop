import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: any): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistid)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.newTitle, filter: 'all'};
            return [...state, newTodolist]
        }
        default:
            return state
    }

}

type KingTypeAction = removeTodolistACType | addTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (todolistid: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistid
        }
    } as const
}

export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
        }
    } as const
}