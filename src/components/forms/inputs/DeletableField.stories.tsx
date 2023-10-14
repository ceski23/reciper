import { Meta, StoryObj } from '@storybook/react';
import {
  ChangeEvent, ComponentProps, FC, useState,
} from 'react';

import { DeletableField } from 'components/forms/inputs/DeletableField';

export default {
  title: 'Components/Form/DeletableField',
  component: DeletableField,
} as Meta<typeof DeletableField>;

const FieldWithHooks: FC<ComponentProps<typeof DeletableField>> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    args.onChange?.(event);
  };

  return <DeletableField {...args} value={inputValue} onChange={handleChange} />;
};

export const Default: StoryObj<ComponentProps<typeof DeletableField>> = {
  render: (args) => <FieldWithHooks {...args} />,
};
