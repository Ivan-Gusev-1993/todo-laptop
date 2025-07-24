import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    changeAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { selectThemeMode, selectStatus, selectAppError } = appSlice.selectors
export const { changeThemeModeAC, changeStatusAC, changeAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
