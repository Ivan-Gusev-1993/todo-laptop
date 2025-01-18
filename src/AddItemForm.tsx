import {ChangeEvent, KeyboardEvent, useState} from "react";
import {ButtonComponent} from "./ButtonComponent";
import {Button, Fab, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem:(title: string) => void
}

function AddIcon() {
    return null;
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

            <Button variant="contained" onClick={addTaskHandler}>+</Button>

        </div>
    )
}