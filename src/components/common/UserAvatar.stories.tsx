import { Meta, StoryObj } from '@storybook/react';

import { UserAvatar } from 'components/common/UserAvatar';

export default {
  title: 'Components/UserAvatar',
  component: UserAvatar,
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (args) => <UserAvatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://i.pravatar.cc/300',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {};
