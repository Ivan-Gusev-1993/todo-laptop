import {RootState} from "../app/store.ts";
import type {TasksState} from "@/model/tasks-reducer.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks
