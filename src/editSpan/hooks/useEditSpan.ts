import { ChangeEvent } from 'react';

type TUseEditSpanProps = {
  title: string;
  newTitle: string;
  onChangeTitle: (newTitle: string) => void;
  setEditMode: (editMode: boolean) => void;
  setNewTitle: (newTitle: string) => void;
};

type TReturnUseEditSpan = {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  activateEditMode: () => void;
  activateViewMode: () => void;
};

export const useEditSpan = (props: TUseEditSpanProps): TReturnUseEditSpan => {
  const { title, newTitle, onChangeTitle, setNewTitle, setEditMode } = props;

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

  return {
    onChangeHandler,
    activateEditMode,
    activateViewMode,
  };
};
