import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ButtonComponent} from "./ButtonComponent";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	filter: FilterValuesType
	changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	ChangeTaskStatus: (taskId:string, taskStatus: boolean, todolistId: string) => void
	id: string
	removeTodolist: (todolistId: string) => void
	onChangeTaskTitle: (taskId:string, newTitle: string, todolistId: string)=> void
	changeTodolistTitle: (todolistId: string, newTitle: string)=>void
}


export const Todolist = (props: TodolistPropsType) => {

	const changeFilterTasksHandler = (filterValue: FilterValuesType, id: string) => {
		props.changeFilter(filterValue, id)
	}

	const removeTodolistHandler = () => {
		props.removeTodolist(props.id)
	}

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const changeTodolistTitle = (newTitle: string) => {
		props.changeTodolistTitle(props.id, newTitle)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={changeTodolistTitle}/>
				{/*<Button onClick={removeTodolistHandler}><DeleteIcon/></Button>*/}
				<IconButton  onClick={removeTodolistHandler} aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</h3>

			<AddItemForm
				addItem={addTask}
			/>

			{
				props.tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{props.tasks.map((task) => {

							const removeTaskHandler = () => {
								props.removeTask(task.id, props.id)
							}
							const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
								let taskStatus = event.currentTarget.checked
								props.ChangeTaskStatus(task.id, taskStatus, props.id)
							}

							const onChangeTaskTitleValueHandler = (newValue: string) => {

								props.onChangeTaskTitle(task.id, newValue, props.id)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" onChange={onChangeTaskStatusHandler} checked={task.isDone}/>
								<EditableSpan title={task.title} onChange={onChangeTaskTitleValueHandler}/>
								<ButtonComponent onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<ButtonComponent
					className={props.filter === 'all' ? 'active-filter' : ''}
					title={'All'}
					onClick={()=> changeFilterTasksHandler('all', props.id)}
				/>

				<ButtonComponent
					className={props.filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={()=> changeFilterTasksHandler('active' , props.id)}
				/>

				<ButtonComponent
					className={props.filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={()=> changeFilterTasksHandler('completed' , props.id)}
				/>
			</div>
		</div>
	)
}

