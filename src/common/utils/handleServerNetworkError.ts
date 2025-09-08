import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
