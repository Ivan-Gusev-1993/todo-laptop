import {RootState} from "../app/store.ts";
import {TasksState} from "../app/App.tsx";

export const selectTasks = (state: RootState): TasksState => state.tasks
