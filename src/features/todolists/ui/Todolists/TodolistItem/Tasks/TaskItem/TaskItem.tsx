import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks"
import { changeTaskStatus, changeTaskTitle, deleteTask } from "@/features/todolists/model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { TaskStatus } from "@/common/enums"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    dispatch(changeTaskStatus(newTask))
  }

  const changeTaskTitleHandler = (title: string) => {
    const newTask = { ...task, title }
    dispatch(changeTaskTitle(newTask))
  }

  const isDone = task.status === TaskStatus.Completed
  console.log("task", task)
  return (
    <ListItem sx={getListItemSx(isDone)}>
      <div>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
