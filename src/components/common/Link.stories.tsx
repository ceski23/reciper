import { Meta, StoryObj } from '@storybook/react';

import { Link } from 'components/common/Link';

export default {
  title: 'Components/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Internal = Template.bind({});
Internal.args = {
  to: '/home',
  children: 'Go to home',
};

export const External = Template.bind({});
External.args = {
  to: 'https://google.com',
  children: 'Go to Google',
};
