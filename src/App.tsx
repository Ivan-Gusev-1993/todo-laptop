import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilteredType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'React query', isDone: false},
    ])

    let [filter, setFilter] = useState<FilteredType>('all')

    const changeFilter = (filter:FilteredType) => {
        setFilter(filter)
    }

    let taskForTodolist = tasks
    if (filter === 'active'){
        taskForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed'){
        taskForTodolist = tasks.filter(t => t.isDone)
    }

    const addTask = (title: string) => {
        const newTask = {
            id:v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])

    }

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
       setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist} date={new Date()}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
