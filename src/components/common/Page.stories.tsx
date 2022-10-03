import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Page } from 'components/common/Page';

export default {
  title: 'Layout/Page',
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>Page content</p>,
};
