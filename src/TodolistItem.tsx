import {FilterValuesType, TaskStateType, TaskType} from "./AppWithRedux";
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {containerSx, getListItemSx} from './TodolistItem.styles'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TodolistPropsType = {
	title: string
	filter: FilterValuesType
	changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
	id: string
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (todolistId: string, newTitle: string)=>void
}

export const TodolistItem = (props: TodolistPropsType) => {

	const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
	const dispatch = useDispatch();

	const changeFilterTasksHandler = (filterValue: FilterValuesType, id: string) => {
		props.changeFilter(filterValue, id)
	}

	const removeTodolistHandler = () => {
		props.removeTodolist(props.id)
	}

	const addTask = (title: string) => {
		dispatch(addTaskAC(title, props.id))
	}

	const changeTodolistTitle = (newTitle: string) => {
		props.changeTodolistTitle(props.id, newTitle)
	}

	let tasksForTodolist = tasksObj
	if (props.filter === 'active') {
		tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
	}

	if (props.filter === 'completed') {
		tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={changeTodolistTitle}/>

				<IconButton  onClick={removeTodolistHandler} aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</h3>

			<AddItemForm
				addItem={(title)=> dispatch(addTaskAC(title, props.id))}
			/>

			{
				tasksForTodolist.length === 0
					? <p>There are no tasks</p>
					: <List>
						{tasksForTodolist.map((task) => {

							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, props.id))
							}
							const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
								let taskStatus = event.currentTarget.checked
								dispatch(changeTaskStatusAC(task.id, task.isDone, props.id))
							}

							const onChangeTaskTitleValueHandler = (newValue: string) => {
								dispatch(changeTaskTitleAC(task.id, newValue, props.id))
							}

							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
									<EditableSpan title={task.title} onChange={onChangeTaskTitleValueHandler}/>
								</div>
								<IconButton onClick={removeTaskHandler} aria-label="delete">
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={containerSx}>
				<Button variant={props.filter === 'all' ? 'outlined' : 'text'}
						color={'inherit'}
						onClick={() => changeFilterTasksHandler('all', props.id)}>
					All
				</Button>
				<Button variant={props.filter === 'active' ? 'outlined' : 'text'}
						color={'primary'}
						onClick={() => changeFilterTasksHandler('active', props.id)}>
					Active
				</Button>
				<Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
						color={'secondary'}
						onClick={() => changeFilterTasksHandler('completed', props.id)}>
					Completed
				</Button>
			</Box>
		</div>
	)
}

