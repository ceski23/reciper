import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, FC, useState } from 'react';

import { NumberField } from 'components/forms/inputs/NumberField';

export default {
  title: 'Components/Form/NumberField',
  component: NumberField,
} as Meta<typeof NumberField>;

const InputWithProps: FC<ComponentProps<typeof NumberField>> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: number) => {
    setInputValue(newValue);
    args.onChange(newValue);
  };

  return <NumberField {...args} value={inputValue} onChange={handleChange} />;
};

export const Default: StoryObj<ComponentProps<typeof NumberField>> = {
  render: (args) => <InputWithProps {...args} />,
};

export const WithStep: StoryObj<ComponentProps<typeof NumberField>> = {
  args: {
    step: 5,
  },
  render: (args) => <InputWithProps {...args} />,
};
