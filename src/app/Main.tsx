import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/TodolistItem.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC, type FilterValues
} from "@/model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


export const Main = () => {
    const todolists = useAppSelector(selectTodolist)
    const tasks = useAppSelector(selectTasks)


    const dispatch = useAppDispatch()
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }
    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(todolist => {
                    const todolistTasks = tasks[todolist.id] || [];
                    let filteredTasks = todolistTasks
                    if (todolist.filter === 'active') {
                        filteredTasks = todolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = todolistTasks.filter(task => task.isDone)
                    }

                    return (
                        <Grid key={todolist.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem todolist={todolist}
                                              tasks={filteredTasks}
                                              deleteTask={deleteTask}
                                              changeFilter={changeFilter}
                                              createTask={createTask}
                                              changeTaskStatus={changeTaskStatus}
                                              deleteTodolist={deleteTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};

