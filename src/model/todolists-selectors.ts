import {RootState} from "../app/store.ts";
import type {Todolist} from "@/model/todolists-reducer.ts";


export const selectTodolist = (state: RootState): Todolist[] => state.todolists
