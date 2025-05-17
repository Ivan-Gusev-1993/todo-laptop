import {CreateItemForm} from './CreateItemForm'
import {type Todolist} from "@/model/todolists-reducer.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";
import {Tasks} from "@/Tasks.tsx";

type Props = { todolist: Todolist }

export const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
