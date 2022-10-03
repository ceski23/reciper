import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { TagInput } from 'components/forms/inputs/TagInput';

export default {
  title: 'Components/Form/TagInput',
  component: TagInput,
} as ComponentMeta<typeof TagInput>;

const Template: ComponentStory<typeof TagInput> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: string[]) => {
    setInputValue(newValue);
    args.onChange(newValue);
  };

  return <TagInput {...args} value={inputValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'test',
  value: [],
};
