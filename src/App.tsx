import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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

type TaskStateType = {
    [key: string] :Array<TaskType>
}


function App() {

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(td => td.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        setTasksObj({...tasksObj, [todolistId]: [task, ...tasksObj[todolistId]]})
    }

    const ChangeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t )})
    }

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
     setTodolists(todolists.map ( todolist=> todolist.id === todolistId ? {...todolist, filter : filterValue} : todolist) )
    }

    const todolistId01 = v1()
    const todolistId02 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId01, title: "What to learn", filter: "all"},
        {id: todolistId02, title: "What to sale", filter: "all"}
    ]);

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todolistId01]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}],

        [todolistId02]: [
            {id: v1(), title: 'Laptop', isDone: false},
            {id: v1(), title: 'Xbox', isDone: true}]

    });

    const addTodolist = (title: string) => {
        let todolist: TodolistType = { id: v1(), title: title, filter: 'all' }
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj, [todolist.id]:[]
        })
    }

    const onChangeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t )})
    }

    const ChangeTodolistTitle = (id:string, newTitle:string) => {
        setTodolists(todolists.map(td => td.id === id ? {...td, title: newTitle} : td ))
    }

    return (
        <div className="App">
            <AppBar sx={{mb: '30px'}} position="static">
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">Sign in</Button>

                    </Container>
                </Toolbar>
            </AppBar>
            <Container   maxWidth={'lg'}>
                <Grid sx={{mb: '30px'}} container>
                    <AddItemForm addItem={addTodolist} />
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
                            <Grid  key={tl.id} margin={'25px'}>
                                <Paper   sx={{ p: '0 20px 20px 20px' }}>
                                <Todolist
                                    id={tl.id}
                                    key={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    ChangeTaskStatus={ChangeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    onChangeTaskTitle={onChangeTitle}
                                    changeTodolistTitle={ChangeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
