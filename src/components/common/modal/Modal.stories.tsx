import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from 'components/common/modal/Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  children: <Modal.Body>Treść</Modal.Body>,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  isOpen: true,
  children: (
    <>
      <Modal.Header title="Tytuł" />
      <Modal.Body>Treść</Modal.Body>
    </>
  ),
  showBackdrop: true,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  isOpen: true,
  children: (
    <>
      <Modal.Body>Treść</Modal.Body>
      <Modal.Footer cancelText="Anuluj" acceptText="Ok" />
    </>
  ),
  showBackdrop: true,
};

export const Complete = Template.bind({});
Complete.args = {
  isOpen: true,
  children: (
    <>
      <Modal.Header title="Tytuł" />
      <Modal.Body>Treść</Modal.Body>
      <Modal.Footer cancelText="Anuluj" acceptText="Ok" />
    </>
  ),
  showBackdrop: true,
};
