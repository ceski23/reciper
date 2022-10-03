import { ComponentStory } from '@storybook/react';

import { FluidContainer, FullBleed } from 'components/common/Container';

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan luctus interdum. Fusce in efficitur sapien. Vestibulum volutpat ut mauris accumsan cursus. Aenean sit amet malesuada purus. Duis vel maximus arcu. Nam quis est tortor. Quisque elementum elit ac augue eleifend congue. Proin consectetur eget nisi at placerat. Nulla vel consectetur dolor, non feugiat ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer aliquam libero in viverra feugiat. Nulla facilisi. Cras pharetra efficitur nisi vitae tempus. Proin pellentesque ex cursus pellentesque hendrerit. Etiam ligula sem, pretium quis augue quis, aliquam feugiat lectus.
`;

export default {
  title: 'Components/Container',
};

export const FluidStory: ComponentStory<typeof FluidContainer> = (props) => (
  <FluidContainer {...props} />
);
FluidStory.args = { children: <p>{loremIpsum}</p> };
FluidStory.storyName = 'FluidContainer';

export const FullBleedStory: ComponentStory<typeof FullBleed> = (props) => (
  <FluidContainer>
    <FullBleed {...props} />
  </FluidContainer>
);
FullBleedStory.args = { children: <p>{loremIpsum}</p> };
FullBleedStory.storyName = 'FullBleed';
