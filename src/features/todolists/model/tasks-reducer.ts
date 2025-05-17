import {
    createTodolistAC,
    deleteTodolistAC,
} from './todolists-reducer.ts'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const {todolistId, taskId} = action.payload;
            const tasks = state[todolistId];
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const {todolistId, title} = action.payload;
            const newTask: Task = {
                title,
                isDone: false,
                id: nanoid(),
            };
            state[todolistId].unshift(newTask);

        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})
