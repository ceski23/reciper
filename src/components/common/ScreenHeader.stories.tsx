import { Meta, StoryObj } from '@storybook/react';

import { ScreenHeader } from 'components/common/ScreenHeader';

export default {
  title: 'Components/ScreenHeader',
  component: ScreenHeader,
} as ComponentMeta<typeof ScreenHeader>;

const Template: ComponentStory<typeof ScreenHeader> = (args) => <ScreenHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Tytuł',
};

export const WithBackLink = Template.bind({});
WithBackLink.args = {
  title: 'Tytuł',
  backLink: '/home',
};
