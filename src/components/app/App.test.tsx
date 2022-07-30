import { screen } from '@testing-library/react';

import { renderWithProviders } from 'test/utils';

import App from 'components/app/App';

const matchMediaMock = vi.fn(() => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

vi.stubGlobal('matchMedia', matchMediaMock);

describe('App', () => {
  it('should initially show loading text', async () => {
    renderWithProviders(<App />);

    const loadingText = await screen.findByText('Ładowanie...');
    expect(loadingText).toBeInTheDocument();
  });
});
