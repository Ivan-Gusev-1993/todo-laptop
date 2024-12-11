import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

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

function App() {

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(td => td.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter((task) => {
            return task.id !== taskId
        })
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todolistId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [task, ...tasks]
        setTasksObj({...tasksObj})
    }

    const ChangeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newStatus = tasksObj[todolistId].map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t))
        tasksObj[todolistId] = newStatus
        setTasksObj({...tasksObj})
    }

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
     setTodolists(todolists.map ( todolist=> todolist.id === todolistId ? {...todolist, filter : filterValue} : todolist) )
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to sale", filter: "all"}
    ]);

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}],

        [todolistId2]: [
            {id: v1(), title: 'Laptop', isDone: false},
            {id: v1(), title: 'Xbox', isDone: true}]

    });

    return (
        <div className="App">
            {todolists.map(tl => {

                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }
                return (
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
                    />
                )
            })}


        </div>
    );
}

export default App;
