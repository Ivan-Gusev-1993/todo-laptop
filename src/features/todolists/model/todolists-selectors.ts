import {RootState} from "../../../app/store.ts";
import type {Todolist} from "@/features/todolists/model/todolists-reducer.ts";


export const selectTodolist = (state: RootState): Todolist[] => state.todolists
