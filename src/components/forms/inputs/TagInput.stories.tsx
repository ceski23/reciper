import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, FC, useState } from 'react';

import { TagInput } from 'components/forms/inputs/TagInput';

export default {
  title: 'Components/Form/TagInput',
  component: TagInput,
} as Meta<typeof TagInput>;

const InputWithHooks: FC<ComponentProps<typeof TagInput>> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: string[]) => {
    setInputValue(newValue);
    args.onChange(newValue);
  };

  return <TagInput {...args} value={inputValue} onChange={handleChange} />;
};

export const Default: StoryObj<ComponentProps<typeof TagInput>> = {
  args: {
    name: 'test',
    value: [],
  },
  render: (args) => <InputWithHooks {...args} />,
};
