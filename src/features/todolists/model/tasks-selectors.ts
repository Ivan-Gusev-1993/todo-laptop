import type {RootState} from '@/app/store'
import type {TasksState} from './tasks-reducer'

export const selectTasks = (state: RootState): TasksState => state.tasks
