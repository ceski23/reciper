import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { ImageUpload } from 'components/common/ImageUpload';

describe('ImageUpload', () => {
  it('should show drag reference', () => {
    renderWithProviders(<ImageUpload onChange={vi.fn()} />);

    const dragText = screen.getByText(/kliknij/i);
    expect(dragText).toBeInTheDocument();
  });

  it('should upload image', async () => {
    const handleChange = vi.fn();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const user = userEvent.setup();

    renderWithProviders(<ImageUpload onChange={handleChange} />);

    const input = screen.getByLabelText(/kliknij lub upuść zdjęcie/i);

    await user.upload(input, file);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
