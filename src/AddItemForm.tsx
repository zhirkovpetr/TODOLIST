import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  let {addItem} = props
  const [titleInput, setTitleInput] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim()) {
      setInputError(false)
    } else {
      setInputError(true)
    }
    setTitleInput(e.currentTarget.value)
  }

  const onAddTaskHandler = () => {
    const trimmedTitle = titleInput.trim()
    trimmedTitle ? addItem(trimmedTitle) : setInputError(true)
    setTitleInput("");
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTaskHandler()
    }
  }

  return (
    <div>
      <input
        className={inputError ? 'error' : ''}
        value={titleInput}
        onChange={onChangeTaskHandler}
        onKeyPress={onKeyPressHandler}/>
      <button onClick={onAddTaskHandler}>+</button>
      {inputError && <div className='error-message'>Field is required</div>}
    </div>
  )
}
