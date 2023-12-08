import type { Meta, StoryObj } from '@storybook/react';

import { App } from '../components/app';

const meta: Meta<typeof App> = {
  title: 'TODOLIST/App',
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};
