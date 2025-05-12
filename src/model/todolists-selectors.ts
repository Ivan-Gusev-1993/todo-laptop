import {RootState} from "../app/store.ts";
import {Todolist} from "../App.tsx";

export const selectTodolist = (state: RootState): Todolist[] => state.todolists
