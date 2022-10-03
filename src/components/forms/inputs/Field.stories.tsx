import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Field } from 'components/forms/inputs/Field';

export default {
  title: 'Components/Form/Field',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Field label',
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Field label',
  required: true,
  error: 'Some error message',
};
