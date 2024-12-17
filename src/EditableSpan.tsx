import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title: string)=>void
}

export function EditableSpan(props: EditableSpanPropsType){
    let [editMode, setEditMode]=useState(false)
    let [titleValue, setTitleValue]= useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitleValue(props.title)
    }
    const activateViewMode= () => {
        setEditMode(false);
        props.onChange(titleValue);
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    return (
        editMode
        ? <input value={titleValue} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}