import React, { memo, useState } from 'react';

import TextField from '@mui/material/TextField';

import { useEditSpan } from './useEditSpan';

type EditSpanPropsType = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
};

export const EditSpan: React.FC<EditSpanPropsType> = memo(props => {
  const { title, onChangeTitle } = props;

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const { onChangeHandler, activateEditMode, activateViewMode } = useEditSpan({
    title,
    newTitle,
    onChangeTitle,
    setEditMode,
    setNewTitle,
  });

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
