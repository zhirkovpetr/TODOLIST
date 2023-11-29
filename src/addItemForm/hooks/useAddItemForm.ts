import { ChangeEvent, KeyboardEvent } from 'react';

type TUseAddItemFormProps = {
  titleInput: string;
  addItem: (title: string) => void;
  setTitleInput: (titleInput: string) => void;
  setInputError: (inputError: boolean) => void;
};

type TReturnUseAddItemForm = {
  onChangeTaskHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddTaskHandler: () => void;
  onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const useAddItemForm = (props: TUseAddItemFormProps): TReturnUseAddItemForm => {
  const { titleInput, addItem, setTitleInput, setInputError } = props;

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

  return {
    onChangeTaskHandler,
    onAddTaskHandler,
    onKeyPressHandler,
  };
};
