import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ButtonFilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: true},
            {id: v1(), title: "ES6/TS", isDone: false},
        ]
    )

    let [filterValue, setFilterValue] = useState<ButtonFilterType>('all')

    const changeIsDone = (newId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone: newIsDone} : el))
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((el) => el.id !== taskID))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        const newObj = [newTask, ...tasks]
        setTasks(newObj)
    }

    let myButtonFilter = (buttonName: ButtonFilterType) => {
        setFilterValue(buttonName)
    }

    let selectButtonValue = tasks;
    if (filterValue === 'active') {
        selectButtonValue = tasks.filter(el => !el.isDone)
    }
    if (filterValue === 'completed') {
        selectButtonValue = tasks.filter(el => el.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                task={selectButtonValue}
                removeTask={removeTask}
                myButtonFilter={myButtonFilter}
                addTask={addTask}
                changeIsDone={changeIsDone}
            />
        </div>
    )
}

export default App;
