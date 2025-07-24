import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"
import { changeAppErrorAC, changeStatusAC } from "@/app/app-slice"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(changeAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(changeAppErrorAC({ error: "Some error occurred" }))
  }
  dispatch(changeStatusAC({ status: "failed" }))
}
