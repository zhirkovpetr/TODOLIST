import type { Meta, StoryObj } from '@storybook/react';

import { Todolist } from '../todolist/Todolist';

const meta: Meta<typeof Todolist> = {
  title: 'TODOLIST/Todolist',
  component: Todolist,
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
    deleteTodolist: {
      description: 'Double clicked button delete todolist',
      action: 'clicked',
    },
    changeTodolistFilter: {
      description: 'Double clicked button change todolist filter',
      action: 'clicked',
    },
    addTask: {
      description: 'Double clicked button add task',
      action: 'clicked',
    },
    changeTodolistTitle: {
      description: 'Double clicked button change todolist title',
      action: 'clicked',
    },
  },
  args: {
    title: 'todolist title',
    todolistId: crypto.randomUUID(),
    tasks: [],
    filter: 'All',
  },
};

export default meta;
type Story = StoryObj<typeof Todolist>;

export const TodolistStory: Story = {};
