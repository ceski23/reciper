import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { NumberField } from 'components/forms/inputs/NumberField';

export default {
  title: 'Components/Form/NumberField',
  component: NumberField,
} as ComponentMeta<typeof NumberField>;

const Template: ComponentStory<typeof NumberField> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: number) => {
    setInputValue(newValue);
    args.onChange(newValue);
  };

  return <NumberField {...args} value={inputValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithStep = Template.bind({});
WithStep.args = {
  step: 5,
};
