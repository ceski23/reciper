import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LinkButton } from 'components/common/LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  to: '/home',
  children: 'Go to home',
};
