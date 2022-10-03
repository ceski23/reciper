import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthToast } from 'components/common/AuthToast';

export default {
  title: 'Components/AuthToast',
  component: AuthToast,
} as ComponentMeta<typeof AuthToast>;

const Template: ComponentStory<typeof AuthToast> = (args) => <AuthToast {...args} />;

export const Default = Template.bind({});
Default.args = {};
