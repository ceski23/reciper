import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RecipesFilters } from 'components/common/RecipesFilters';

export default {
  title: 'Components/RecipesFilters',
  component: RecipesFilters,
} as ComponentMeta<typeof RecipesFilters>;

const Template: ComponentStory<typeof RecipesFilters> = (args) => <RecipesFilters {...args} />;

export const Default = Template.bind({});
Default.args = {};
