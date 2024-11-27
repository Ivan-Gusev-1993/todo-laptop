import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	filter: FilterValuesType
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
	ChangeTaskStatus: (taskId:string, taskStatus: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, filter, changeFilter, addTask, ChangeTaskStatus}: PropsType) => {

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if (taskTitle.trim() !== ''){
			addTask(taskTitle.trim())
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

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
	}

	return (
		<div>
			<h3>{title}</h3>
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
								removeTask(task.id)
							}
							const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
								let taskStatus = event.currentTarget.checked
								ChangeTaskStatus(task.id, taskStatus)
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
					onClick={()=> changeFilterTasksHandler('all')}
				/>

				<Button
					className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={()=> changeFilterTasksHandler('active')}
				/>

				<Button
					className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={()=> changeFilterTasksHandler('completed')}
				/>
			</div>
		</div>
	)
}
