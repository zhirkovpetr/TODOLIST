import { useCallback } from 'react';

import { FilterType } from './App';

type TUseTodolistProps = {
  changeTodolistFilter: (value: FilterType, todolistId: string) => void;
  deleteTodolist: (todolistId: string) => void;
  todolistId: string;
};

type TReturnUseTodolist = {
  onAllFilterHandler: () => void;
  onCompletedFilterHandler: () => void;
  onActiveFilterHandler: () => void;
  onDeleteTodolistHandler: () => void;
};

export const useTodolist = (props: TUseTodolistProps): TReturnUseTodolist => {
  const { changeTodolistFilter, deleteTodolist, todolistId } = props;

  const onAllFilterHandler = useCallback((): void => {
    changeTodolistFilter('All', todolistId);
  }, [changeTodolistFilter, todolistId]);

  const onCompletedFilterHandler = useCallback((): void => {
    changeTodolistFilter('Completed', todolistId);
  }, [changeTodolistFilter, todolistId]);

  const onActiveFilterHandler = useCallback((): void => {
    changeTodolistFilter('Active', todolistId);
  }, [changeTodolistFilter, todolistId]);

  const onDeleteTodolistHandler = (): void => {
    deleteTodolist(todolistId);
  };

  return {
    onAllFilterHandler,
    onCompletedFilterHandler,
    onActiveFilterHandler,
    onDeleteTodolistHandler,
  };
};
