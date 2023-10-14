import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { ReactComponent as HomeIcon } from 'assets/common/home.svg';

import { Button } from 'components/common/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<typeof Button>;

export const Normal: StoryObj<ComponentProps<typeof Button>> = {
  args: {
    variant: 'normal',
    children: 'Button',
  },
};

export const Primary: StoryObj<ComponentProps<typeof Button>> = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const NormalSize: StoryObj<ComponentProps<typeof Button>> = {
  args: {
    size: 'normal',
    children: 'Button',
  },
};

export const SmallSize: StoryObj<ComponentProps<typeof Button>> = {
  args: {
    size: 'small',
    children: 'Button',
  },
};

export const WithIcon: StoryObj<ComponentProps<typeof Button>> = {
  args: {
    icon: HomeIcon,
    children: 'Button',
  },
};
