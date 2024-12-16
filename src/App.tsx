import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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
            <AddItemForm id={'6456'} addItem={()=>{}}/>
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
                        addItem={addTask}
                        ChangeTaskStatus={ChangeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
