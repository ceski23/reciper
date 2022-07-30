import { screen } from '@testing-library/react';

import { renderWithProviders } from 'test/utils';

import { ReactComponent as Icon } from 'assets/common/user.svg';

import { LinkButton } from 'components/common/LinkButton';

describe('LinkButton', () => {
  it('should render', () => {
    renderWithProviders(<LinkButton to="/link">test</LinkButton>);

    const link = screen.getByRole('link', { name: /test/i });
    expect(link).toBeInTheDocument();
  });

  it('should render with icon', () => {
    renderWithProviders(<LinkButton to="/link" icon={Icon}>test</LinkButton>);

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });
});
