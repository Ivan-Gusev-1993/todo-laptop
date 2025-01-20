import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'

type AddItemFormPropsType = {
    addItem:(title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== ''){
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={taskTitle}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={addTaskOnKeyUpHandler}
            />

            <IconButton onClick={addTaskHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>

        </div>
    )
}