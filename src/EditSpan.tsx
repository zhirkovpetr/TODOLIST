import React, {ChangeEvent, useState} from "react";

type EditSpanPropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
}

export const EditSpan: React.FC<EditSpanPropsType> = (props) => {
  let {title} = props
  let [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChangeTitle(newTitle)
  }

  return (
    editMode ? <input value={newTitle} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus/> :
      <span onDoubleClick={activateEditMode}>{title}</span>
  )
}
