import {RootState} from "../app/store.ts";
import {Todolist} from "../app/App.tsx";

export const selectTodolist = (state: RootState): Todolist[] => state.todolists
