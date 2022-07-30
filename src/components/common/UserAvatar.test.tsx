import { screen } from '@testing-library/react';

import { renderWithProviders } from 'test/utils';

import { UserAvatar } from 'components/common/UserAvatar';

describe('UserAvatar', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<UserAvatar src="test.png" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should use placeholder image when no src provided', () => {
    renderWithProviders(<UserAvatar />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
