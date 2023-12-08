export default {};
export const foo = (): void => {};

/* import React, { useState } from 'react'; */
/* import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { TaskStatuses } from '../api/tasks-api';
import { Task } from '../task/Task';

export default {}; */

/* const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    deleteTask: {
      description: 'Clicked button delete task',
      action: 'clicked',
    },
    changeTaskStatus: {
      description: 'Clicked button change task status',
      action: 'clicked',
    },
    changeTaskTitle: {
      description: 'Double clicked button change task title',
      action: 'clicked',
    },
  },
  args: {
    task: { id: crypto.randomUUID(), title: 'new task', status: TaskStatuses.Completed },
    todolistId: crypto.randomUUID(),
  },
};

export default meta; */
/* type Story = StoryObj<typeof Task>; */

/* export const TaskIsDoneStory: Story = {}; */

/* export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: crypto.randomUUID(), title: 'new task', status: TaskStatuses.New },
  },
}; */

/* const ToggleTask: React.FC = () => {
  const [task, setTask] = useState({
    id: crypto.randomUUID(),
    title: 'new task',
    status: TaskStatuses.New,
  });

  return (
    <Task
      task={task}
      todolistId={crypto.randomUUID()}
      changeTaskStatus={() =>
        setTask({
          ...task,
          status: task.status ? TaskStatuses.Completed : TaskStatuses.New,
        })
      }
      changeTaskTitle={newTitle => setTask({ ...task, title: newTitle })}
      deleteTask={action('removeTask')}
    />
  );
};

export const ToggleTaskStory: Story = {
  render: () => <ToggleTask />,
}; */
