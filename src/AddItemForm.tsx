import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { ControlPoint } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = props => {
  const { addItem } = props;
  const [titleInput, setTitleInput] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim()) {
      setInputError(false);
    } else {
      setInputError(true);
    }
    setTitleInput(e.currentTarget.value);
  };

  const onAddTaskHandler = (): void => {
    const trimmedTitle = titleInput.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
    } else {
      setInputError(true);
    }
    setTitleInput('');
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onAddTaskHandler();
    }
  };

  return (
    <div>
      <TextField
        required
        label="enter text"
        variant="outlined"
        error={inputError}
        value={titleInput}
        onChange={onChangeTaskHandler}
        onKeyPress={onKeyPressHandler}
        helperText={inputError && 'Field is required'}
      />
      <IconButton color="primary" onClick={onAddTaskHandler}>
        <ControlPoint />
      </IconButton>
    </div>
  );
};
