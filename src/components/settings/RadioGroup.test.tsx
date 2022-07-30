import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { RadioGroup } from 'components/settings/RadioGroup';

describe('RadioGroup', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <RadioGroup
        name="test"
        title="Test"
        onSelected={vi.fn()}
        value="test1"
        hint="test hint"
        options={[
          { text: 'Test1', value: 'test1' },
          { text: 'Test2', value: 'test2' },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should change selection', async () => {
    const user = userEvent.setup();
    const handleSelected = vi.fn();

    renderWithProviders(
      <RadioGroup
        name="test"
        title="Test"
        onSelected={handleSelected}
        value="test1"
        options={[
          { text: 'Test1', value: 'test1' },
          { text: 'Test2', value: 'test2' },
        ]}
      />,
    );

    const radio = screen.getByRole('radio', { name: /test2/i });
    await user.click(radio);
    expect(handleSelected).toBeCalledTimes(1);
  });
});
