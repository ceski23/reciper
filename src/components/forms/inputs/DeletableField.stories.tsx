import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { DeletableField } from 'components/forms/inputs/DeletableField';

export default {
  title: 'Components/Form/DeletableField',
  component: DeletableField,
} as ComponentMeta<typeof DeletableField>;

const Template: ComponentStory<typeof DeletableField> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
    args.onChange?.(event);
  };

  return <DeletableField {...args} value={inputValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};
