import { TaskStatuses, TTask } from '../api/tasks-api';
import { FilterType } from '../app/App';

export const filterTasks = (tasks: TTask[], filter: FilterType): TTask[] => {
  let resultTasks = tasks || [];

  if (filter === 'Active') {
    resultTasks = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (filter === 'Completed') {
    resultTasks = tasks.filter(t => t.status === TaskStatuses.Completed);
  }
  return resultTasks;
};
