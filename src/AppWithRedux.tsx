import './App.css';
import {TodolistItem} from "./TodolistItem";
import {useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from "./TodolistItem.styles";
import {NavButton} from "./NavButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type ThemeMode = 'dark' | 'light'


function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolist)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)


    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatch(action)
    }

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filterValue)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    const onChangeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar sx={{mb: '30px'}} position="static">
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid sx={{mb: '30px'}} container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3} gap={3}>
                    {todolists.map(tl => {

                        let tasksForTodolist = tasksObj[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                        }

                        return (
                            <Grid key={tl.id} margin={'25px'}>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <TodolistItem
                                        id={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        ChangeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        onChangeTaskTitle={onChangeTitle}
                                        changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default AppWithRedux;
