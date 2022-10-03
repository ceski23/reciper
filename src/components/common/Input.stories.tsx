import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEventHandler, useState } from 'react';

import { Input } from 'components/common/Input';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    args.onChange?.(event);
  };

  return <Input {...args} value={inputValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  value: 'Test',
};
