import { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line no-restricted-imports
import logoUrl from '../../../public/logo192.png';

import { Image } from 'components/common/Image';

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: logoUrl,
};

export const WithFallback = Template.bind({});
WithFallback.args = {
  src: 'http://notworking.url',
  fallback: <p>Image fallback</p>,
};
