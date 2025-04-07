import './App.css';
import {TodolistItem} from "./TodolistItem";
import {useReducer, useState} from "react";
import {v1} from "uuid";
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
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

    const todolistId01 = v1()
    const todolistId02 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
        {id: todolistId01, title: "What to learn", filter: "all"},
        {id: todolistId02, title: "What to sale", filter: "all"}
    ]);

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {

        [todolistId01]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}],

        [todolistId02]: [
            {id: v1(), title: 'Laptop', isDone: false},
            {id: v1(), title: 'Xbox', isDone: true},
            {id: v1(), title: 'piano', isDone: true}]

    });


    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filterValue)
        dispatchToTodolistsReducer(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const onChangeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
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
