import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { EditSpan } from '../components/editSpan';

const meta: Meta<typeof EditSpan> = {
  title: 'TODOLIST/EditSpan',
  component: EditSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChangeTitle: {
      description: 'Clicked button change title',
      action: 'clicked',
    },
  },
  args: {
    title: 'title',
  },
};

export default meta;
type Story = StoryObj<typeof EditSpan>;

export const EditSpanStory: Story = {};

const ChangeEditSpan: React.FC = () => {
  const [title, setTitle] = useState('title');
  return <EditSpan title={title} onChangeTitle={() => setTitle('newTitle')} />;
};

export const ChangeEditSpanStory: Story = {
  render: () => <ChangeEditSpan />,
};
