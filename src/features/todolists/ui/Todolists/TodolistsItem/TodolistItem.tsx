import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import {type Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistsItem/TodolistTitle/TodolistTitle.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistsItem/FilterButtons/FilterButtons.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistsItem/Tasks/Tasks.tsx";

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
