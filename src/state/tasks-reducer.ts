import {v1} from "uuid";
import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string,
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType;

const initialState: TaskStateType =  {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK' : {
            const newTask = { id: v1(), title: action.title, isDone: false };
            const updatedTasks = [newTask, ...state[action.todolistId]];

            return {...state, [action.todolistId]: updatedTasks }
        }
        case 'CHANGE-TASK-STATUS' : {
            const stateCopy = {...state}

            let tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t=> t.id === action.taskId? {...t, isDone: action.isDone}: t)

            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE' : {
            const { todolistId, taskId, title } = action;
            const updatedTasks = state[todolistId].map(task =>
                task.id === taskId ? { ...task, title: title } : task
            );

            return {
                ...state,
                [todolistId]: updatedTasks
            };

        }
        case 'ADD-TODOLIST' : {
        const stateCopy = {...state}
        stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}