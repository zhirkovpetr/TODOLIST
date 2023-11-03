import React, { ChangeEvent, memo, useState } from 'react';

import TextField from '@mui/material/TextField';

type EditSpanPropsType = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
};

export const EditSpan: React.FC<EditSpanPropsType> = memo(props => {
  const { title, onChangeTitle } = props;
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

  const activateEditMode = (): void => {
    setEditMode(true);
    setNewTitle(title);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    onChangeTitle(newTitle);
  };

  return editMode ? (
    <TextField
      multiline
      variant="standard"
      value={newTitle}
      onBlur={activateViewMode}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
});
