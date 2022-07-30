import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';

import { renderWithProviders } from 'test/utils';

import { Link } from 'components/common/Link';

describe('Link', () => {
  it('should render router link', () => {
    renderWithProviders(<Link to="/test">Link</Link>);

    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toBeInTheDocument();
  });

  it('should render normal link', () => {
    renderWithProviders(<Link to="https://example.com/">Link</Link>);

    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toBeInTheDocument();
  });

  it('should route on click', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <Link to="/test">Link</Link>

        <Routes>
          <Route path="/" element={<p>Home page</p>} />
          <Route path="/test" element={<p>Test page</p>} />
        </Routes>
      </>,
    );

    const link = screen.getByRole('link', { name: /link/i });
    await user.click(link);

    const newText = screen.getByText(/test page/i);
    expect(newText).toBeInTheDocument();
  });
});
