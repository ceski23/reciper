import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { ImageUpload } from 'components/common/ImageUpload';

export default {
  title: 'Components/ImageUpload',
  component: ImageUpload,
} as ComponentMeta<typeof ImageUpload>;

const Template: ComponentStory<typeof ImageUpload> = ({ value, ...args }) => {
  const [image, setImage] = useState(value);

  const handleChange = (newImage?: string) => {
    args.onChange(newImage);
    setImage(newImage);
  };

  return <ImageUpload {...args} onChange={handleChange} value={image} />;
};

export const Default = Template.bind({});
Default.args = {
  compress: false,
};
