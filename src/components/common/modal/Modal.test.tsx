import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { Modal } from 'components/common/modal/Modal';

describe('Modal', () => {
  it('should not render when closed', () => {
    renderWithProviders(
      <Modal onClose={vi.fn()} isOpen={false} />,
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should render with all elements', () => {
    renderWithProviders(
      <Modal isOpen onClose={vi.fn()} onAccept={vi.fn()}>
        <Modal.Header title="Tytuł" />
        <Modal.Body>Treść</Modal.Body>
        <Modal.Footer cancelText="Anuluj" acceptText="Ok" />
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const title = screen.getByText(/tytuł/i);
    expect(title).toBeInTheDocument();

    const text = screen.getByText(/treść/i);
    expect(text).toBeInTheDocument();

    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /anuluj/i });
    expect(cancelButton).toBeInTheDocument();
  });

  describe('should hide', () => {
    test('after clicking ok button', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <Modal isOpen onClose={handleClose} onAccept={handleClose}>
          <Modal.Footer acceptText="Zamknij" />
        </Modal>,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /zamknij/i });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('after clicking cancel button', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <Modal isOpen onClose={handleClose}>
          <Modal.Footer cancelText="Zamknij" />
        </Modal>,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /zamknij/i });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('after clicking escape', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <Modal isOpen onClose={handleClose} closeOnEscape />,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      await user.keyboard('{escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('after clicking outside', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <Modal isOpen onClose={handleClose} showBackdrop />,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      const backdrop = screen.getByTestId('backdrop');
      await user.click(backdrop);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('after clicking close button', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <Modal isOpen onClose={handleClose}>
          <Modal.Header showCloseButton />
        </Modal>,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      const closeButton = screen.getByRole('button');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
