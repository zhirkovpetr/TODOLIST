import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Task } from '../Task';

const meta: Meta<typeof Task> = {
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
    task: { id: crypto.randomUUID(), title: 'new task', isDone: true },
    todolistId: crypto.randomUUID(),
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: crypto.randomUUID(), title: 'new task', isDone: false },
  },
};

const ToggleTask: React.FC = () => {
  const [task, setTask] = useState({
    id: crypto.randomUUID(),
    title: 'new task',
    isDone: false,
  });

  return (
    <Task
      task={task}
      todolistId={crypto.randomUUID()}
      changeTaskStatus={() => setTask({ ...task, isDone: !task.isDone })}
      changeTaskTitle={newTitle => setTask({ ...task, title: newTitle })}
      deleteTask={action('removeTask')}
    />
  );
};

export const ToggleTaskStory: Story = {
  render: () => <ToggleTask />,
};
