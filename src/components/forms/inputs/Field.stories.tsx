import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Field } from 'components/forms/inputs/Field';

export default {
  title: 'Components/Form/Field',
  component: Field,
} as Meta<typeof Field>;

export const Default: StoryObj<ComponentProps<typeof Field>> = {};

export const WithLabel: StoryObj<ComponentProps<typeof Field>> = {
  args: {
    label: 'Field label',
    required: true,
  },
};

export const WithError: StoryObj<ComponentProps<typeof Field>> = {
  args: {
    label: 'Field label',
    required: true,
    error: 'Some error message',
  },
};
