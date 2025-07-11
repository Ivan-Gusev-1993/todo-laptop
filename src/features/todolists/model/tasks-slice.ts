import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { createAppSlice } from "@/common/utils"
import { changeStatusAC } from "@/app/app-slice.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  reducers: (create) => ({
    //actions
    // changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
    //   // const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
    //   // if (task) {
    //   //   task.title = action.payload.title
    //   // }
    // }),
    //thunks
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(changeStatusAC({ status: "idle" }))
          return { tasks: res.data.items, todolistId }
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTask: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTask(arg)
          return { task: res.data.data.item }
        } catch (e) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (arg: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(arg)
          return arg
        } catch (e) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    changeTaskStatus: create.asyncThunk(
      async (task: DomainTask, thunkAPI) => {
        try {
          const model: UpdateTaskModel = {
            status: task.status,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
          }
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          return { task: res.data.data.item }
        } catch (e) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.status = action.payload.task.status
          }
        },
      },
    ),
    changeTaskTitle: create.asyncThunk(
      async (task: DomainTask, thunkAPI) => {
        try {
          const model: UpdateTaskModel = {
            status: task.status,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
          }
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          return { task: res.data.data.item }
        } catch (e) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.title = action.payload.task.title
          }
        },
      },
    ),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { fetchTasks, createTask, deleteTask, changeTaskStatus, changeTaskTitle } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, DomainTask[]>
