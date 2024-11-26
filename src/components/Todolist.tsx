import React, {ChangeEvent, useState} from 'react';
import {FilteredType, TasksType} from "../App";
import {Button} from "./Button";
import {Simulate} from "react-dom/test-utils";
import keyUp = Simulate.keyUp;
import {log} from "node:util";


type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    date?: Date
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilteredType) => void
    addTask: (title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    let [taskTitle, setTaskTitle] = useState('')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyUp={event => event.key === 'Enter' ? props.addTask(taskTitle) : '' }
                       onChange={onChangeInputHandler} value={taskTitle}
                />
                <Button title={'+'} onClick={onClickButtonHandler}/>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button title={'All'} onClick={() => {
                    props.changeFilter('all')
                }}/>
                <Button title={'Active'} onClick={() => {
                    props.changeFilter('active')
                }}/>
                <Button title={'Completed'} onClick={() => {
                    props.changeFilter('completed')
                }}/>
            </div>
            <div>{props.date?.toString()}</div>
        </div>
    );
};
