import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { fetchTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("ok")
    dispatch(fetchTodolistTC())
  }, [])
  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
