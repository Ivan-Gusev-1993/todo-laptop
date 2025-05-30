import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from "axios";

const token = 'b5120dd7-39f8-44f2-9353-5b1086ba5c96'
const apiKey = 'f87d0b15-33ee-4521-89af-8f71ab35cde0'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
   axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
     headers: {
       Authorization: `Bearer ${token}`,
     }
   }).then((res) => setTodolists(res.data))
  }, [])

  const createTodolist = (title: string) => {
    axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
      }
    }).then((res) => {
      const newTodolist = res.data.data.item
    setTodolists([newTodolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {}

  const changeTodolistTitle = (id: string, title: string) => {}

  const createTask = (todolistId: string, title: string) => {}

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {}

  const changeTaskTitle = (task: any, title: string) => {}

  return (
      <div style={{margin: '20px'}}>
        <CreateItemForm onCreateItem={createTodolist}/>
        {todolists.map((todolist: any) => (
            <div key={todolist.id} style={container}>
              <div>
                <EditableSpan value={todolist.title}
                              onChange={title => changeTodolistTitle(todolist.id, title)}/>
                <button onClick={() => deleteTodolist(todolist.id)}>x</button>
              </div>
              <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
              {tasks[todolist.id]?.map((task: any) => (
                  <div key={task.id}>
                    <Checkbox checked={task.isDone}
                              onChange={e => changeTaskStatus(e, task)}/>
                    <EditableSpan value={task.title}
                                  onChange={title => changeTaskTitle(task, title)}/>
                    <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                  </div>
              ))}
            </div>
        ))}
      </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldError = {
  error: string
  field: string
}

type CreateTodolistResponse = {
  data: { item: Todolist }
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}