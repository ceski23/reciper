import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import icon from 'assets/ingredients/eggs.webp';

import { SelectableTag } from 'components/common/SelectableTag';

export default {
  title: 'Components/SelectableTag',
  component: SelectableTag,
} as ComponentMeta<typeof SelectableTag>;

const Template: ComponentStory<typeof SelectableTag> = ({ selected, ...args }) => {
  const [inputSelected, setInputSelected] = useState(selected);

  const handleClick = () => {
    setInputSelected((val) => !val);
    args.onClick?.();
  };

  return <SelectableTag {...args} selected={inputSelected} onClick={handleClick} />;
};

export const Default = Template.bind({});
Default.args = {
  icon,
  label: 'Eggs',
  selected: false,
};
