import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	filter: FilterValuesType
	changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	ChangeTaskStatus: (taskId:string, taskStatus: boolean, todolistId: string) => void
	id: string
	removeTodolist: (todolistId: string) => void
}

export const Todolist = ({title, tasks, removeTask, filter, changeFilter, addTask, ChangeTaskStatus, id, removeTodolist}: PropsType) => {

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const removeTodolistHandler = () => {
		removeTodolist(id)
	}

	const addTaskHandler = () => {
		if (taskTitle.trim() !== ''){
			addTask(taskTitle.trim(), id)
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (filterValue: FilterValuesType, id: string) => {
		changeFilter(filterValue, id)
	}

	return (
		<div>
			<h3>{title}<Button onClick={removeTodolistHandler} title={'x'}/></h3>
			<div>
				<input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div>}
			</div>
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
