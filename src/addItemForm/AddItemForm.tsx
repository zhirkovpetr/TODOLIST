import React, { memo, useState } from 'react';

import { ControlPoint } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useAddItemForm } from './hooks/useAddItemForm';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = memo(props => {
  const { addItem } = props;
  const [titleInput, setTitleInput] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const { onChangeTaskHandler, onAddTaskHandler, onKeyPressHandler } = useAddItemForm({
    addItem,
    titleInput,
    setTitleInput,
    setInputError,
  });

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
});
