import List from "@mui/material/List";
import {type Task} from "@/features/todolists/model/tasks-reducer.ts";
import type {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistsItem/Tasks/TaskItem/TaskItem.tsx";

type Props = { todolist: Todolist }

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks: Task[] = tasks[id] || [];
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <List>
                    {filteredTasks.map(task => (<TaskItem key={task.id} todolistId={id} task={task}/>))}
                </List>
            )}
        </>
    );
};

