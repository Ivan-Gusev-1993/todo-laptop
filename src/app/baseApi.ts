import { AUTH_TOKEN } from "@/common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppErrorAC } from "@/app/app-slice.ts"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (args, api, extraOptions) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY)
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      if (
        result.error.status === "TIMEOUT_ERROR" ||
        result.error.status === "FETCH_ERROR" ||
        //result.error.status === "PARSING_ERROR" ||
        result.error.status === "CUSTOM_ERROR"
      ) {
        api.dispatch(setAppErrorAC({ error: result.error.error }))
      }
      if (result.error.status === "PARSING_ERROR") {
        api.dispatch(setAppErrorAC({ error: "Error parsing parameters" }))
      }
    }

    return result
  },

  endpoints: () => ({}),
})
