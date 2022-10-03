import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ToastWithButton } from 'components/common/ToastWithButton';

export default {
  title: 'Components/ToastWithButton',
  component: ToastWithButton,
} as ComponentMeta<typeof ToastWithButton>;

const Template: ComponentStory<typeof ToastWithButton> = (args) => <ToastWithButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttonText: 'Test',
  children: 'Toast content',
};
