import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Searchbar } from 'components/common/Searchbar';

export default {
  title: 'Components/Searchbar',
  component: Searchbar,
} as ComponentMeta<typeof Searchbar>;

const Template: ComponentStory<typeof Searchbar> = ({ value, ...args }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (query: string) => {
    setInputValue(query);
    args.onChange?.(query);
  };

  return <Searchbar {...args} value={inputValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
};

export const WithDebounce = Template.bind({});
WithDebounce.args = {
  value: '',
  debounce: 500,
};
