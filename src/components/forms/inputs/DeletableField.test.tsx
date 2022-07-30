import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { DeletableField } from 'components/forms/inputs/DeletableField';

describe('DeletableField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<DeletableField onDeleteClick={vi.fn()} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have working delete button', async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<DeletableField onDeleteClick={handleDelete} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleDelete).toBeCalledTimes(1);
  });
});
