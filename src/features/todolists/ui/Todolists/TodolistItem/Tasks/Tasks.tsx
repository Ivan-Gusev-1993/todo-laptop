import { TaskStatus } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { useEffect } from "react"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
      )}
    </>
  )
}
