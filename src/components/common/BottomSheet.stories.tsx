import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BottomSheet, SheetState } from 'components/common/BottomSheet';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
} as ComponentMeta<typeof BottomSheet>;

const Template: ComponentStory<typeof BottomSheet> = ({ state, ...args }) => {
  const [sheetState, setSheetState] = useState<SheetState>(state);

  const handleStateChange = (newState: SheetState) => {
    args.onStateChange(newState);
    setSheetState(newState);
  };

  return (
    <BottomSheet {...args} state={sheetState} onStateChange={handleStateChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  state: 'peek',
};
