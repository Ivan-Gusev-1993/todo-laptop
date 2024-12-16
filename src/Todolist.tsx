import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	filter: FilterValuesType
	changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
	addItem: (title: string, todolistId: string) => void
	ChangeTaskStatus: (taskId:string, taskStatus: boolean, todolistId: string) => void
	id: string
	removeTodolist: (todolistId: string) => void
}

export const Todolist = ({title, tasks, removeTask, filter, changeFilter, addItem, ChangeTaskStatus, id, removeTodolist}: PropsType) => {

	const changeFilterTasksHandler = (filterValue: FilterValuesType, id: string) => {
		changeFilter(filterValue, id)
	}

	const removeTodolistHandler = () => {
		removeTodolist(id)
	}

	return (
		<div>
			<h3>{title}<Button onClick={removeTodolistHandler} title={'x'}/></h3>

			<AddItemForm
				id={id}
				addItem={addItem}
			/>

			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, id)
							}
							const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
								let taskStatus = event.currentTarget.checked
								ChangeTaskStatus(task.id, taskStatus, id)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" onChange={onChangeTaskStatusHandler} checked={task.isDone}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button
					className={filter === 'all' ? 'active-filter' : ''}
					title={'All'}
					onClick={()=> changeFilterTasksHandler('all', id)}
				/>

				<Button
					className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={()=> changeFilterTasksHandler('active' , id)}
				/>

				<Button
					className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={()=> changeFilterTasksHandler('completed' , id)}
				/>
			</div>
		</div>
	)
}
