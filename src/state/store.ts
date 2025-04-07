import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer
})

type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store