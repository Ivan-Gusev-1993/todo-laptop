import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const todolistsApi = createApi({
  tagTypes: ["Todolists"],
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" })),
      providesTags: ["Todolists"],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolists"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolists"],
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ title, id }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolists"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

//////////////////
export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
