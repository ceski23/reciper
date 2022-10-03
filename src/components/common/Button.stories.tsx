import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ReactComponent as HomeIcon } from 'assets/common/home.svg';

import { Button } from 'components/common/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  variant: 'normal',
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Button',
};

export const NormalSize = Template.bind({});
NormalSize.args = {
  size: 'normal',
  children: 'Button',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: 'small',
  children: 'Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: HomeIcon,
  children: 'Button',
};
