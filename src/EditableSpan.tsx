import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    callBack:(updateTitle:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [updateTitle, setUpdateTitle]=useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if(edit){
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
    props.callBack(updateTitle)
    }

    return (
        edit
            ? <input
                type='text'
                value={updateTitle}
                onBlur={onDoubleClickHandler}
                onChange={onChangeHandler}
                autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    );
};