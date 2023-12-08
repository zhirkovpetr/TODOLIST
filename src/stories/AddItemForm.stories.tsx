import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import AddBox from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField/TextField';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { AddItemForm, AddItemFormPropsType } from '../addItemForm/AddItemForm';

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Clicked button inside form',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

const ErrorAddItemForm = React.memo((props: AddItemFormPropsType) => {
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
        variant="outlined"
        error={!inputError}
        value={titleInput}
        onChange={onChangeTaskHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={!inputError && 'Field is required'}
      />
      <IconButton color="primary" onClick={onAddTaskHandler}>
        <AddBox />
      </IconButton>
    </div>
  );
});

export const ErrorAddItemFormStory: Story = {
  render: () => <ErrorAddItemForm addItem={action('Clicked button inside form')} />,
};
