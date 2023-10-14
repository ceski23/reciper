import { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/common/Button';
import { ErrorInfo } from 'components/common/ErrorInfo';

export default {
  title: 'Components/ErrorInfo',
  component: ErrorInfo,
} as ComponentMeta<typeof ErrorInfo>;

const Template: ComponentStory<typeof ErrorInfo> = (args) => <ErrorInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: 'Nie udało się pobrać danych',
};

export const WithActions = Template.bind({});
WithActions.args = {
  error: 'Nie udało się pobrać danych',
  actions: <Button>Spróbuj ponownie</Button>,
};
