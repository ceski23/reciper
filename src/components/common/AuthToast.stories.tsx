import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { AuthToast } from 'components/common/AuthToast';

export default {
  title: 'Components/AuthToast',
  component: AuthToast,
} as Meta<typeof AuthToast>;

export const Default: StoryObj<ComponentProps<typeof AuthToast>> = {};
