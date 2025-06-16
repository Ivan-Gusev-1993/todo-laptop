import type { ThemeMode } from "./app-slice.ts"
import type { RootState } from "./store"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
