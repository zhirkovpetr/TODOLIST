import { ReactElement, useEffect, useState } from 'react';

import { fetchTask } from '../api/tasks-api';

export default {
  title: 'API-TASK',
};

export const GetTasks = (): ReactElement => {
  const [state, setState] = useState<any>({});
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const todolistId = '50315a27-c976-46d0-b82a-121df8388d2d';
        const data = await fetchTask.getTasks(todolistId);
        setState({ [todolistId]: data.items });
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

export const CreateTask = (): ReactElement => {
  const [state, setState] = useState<any>({});
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const todolistId = '50315a27-c976-46d0-b82a-121df8388d2d';
        const title = 'Task';
        const data = await fetchTask.createTask(todolistId, title);
        setState({ [todolistId]: data.data.item });
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

export const DeleteTask = (): ReactElement => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const todolistId = '50315a27-c976-46d0-b82a-121df8388d2d';
        const taskId = '944c757b-5550-4a6e-bf3a-07b6e7736718';
        const res = await fetchTask.deleteTask(todolistId, taskId);
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

export const UpdateTask = (): ReactElement => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const title = 'New Task';
        const taskId = '944c757b-5550-4a6e-bf3a-07b6e7736718';
        const todolistId = '50315a27-c976-46d0-b82a-121df8388d2d';
        const res = await fetchTask.updateTask(todolistId, { title }, taskId);
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
