import {RootState} from "@/app/store.ts";
import {ThemeMode} from "@/app/app-reducer.ts";


export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
