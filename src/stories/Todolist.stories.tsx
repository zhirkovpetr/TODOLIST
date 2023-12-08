import { ReactElement, useEffect, useState } from 'react';

import { fetchTodolists, TResponseTodolist } from '../api/todolists-api';

export default {
  title: 'API-TODOLIST',
};

export const GetTodolists = (): ReactElement => {
  const [state, setState] = useState<TResponseTodolist[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await fetchTodolists.getTodolists();
        setState(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData().catch(error => {
      console.error(`Error in fetchData: ${error}`);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = (): ReactElement => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const title = 'React';
        const res = await fetchTodolists.createTodolist(title);
        setState(res.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData().catch(error => {
      console.error(`Error in fetchData: ${error}`);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = (): ReactElement => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const todolistId = '60ab809b-d69c-484f-90ce-7f10372b34bd';
        const res = await fetchTodolists.deleteTodolist(todolistId);
        setState(res.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData().catch(error => {
      console.error(`Error in fetchData: ${error}`);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = (): ReactElement => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const todolistId = 'b028a134-7b53-404a-b41a-635d20c194e7';
        const title = 'New React';
        const res = await fetchTodolists.updateTodolistTitle(todolistId, title);
        setState(res.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData().catch(error => {
      console.error(`Error in fetchData: ${error}`);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
