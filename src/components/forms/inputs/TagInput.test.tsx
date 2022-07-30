import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { TagInput } from 'components/forms/inputs/TagInput';

describe('TagInput', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <TagInput name="test" value={['tag1', 'tag2']} onBlur={vi.fn()} onChange={vi.fn()} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should remove last tag', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <TagInput
        name="test"
        value={['tag1', 'tag2']}
        onBlur={vi.fn()}
        onChange={handleChange}
      />,
    );

    // Remove using backspace
    const input = screen.getByRole('textbox');
    await user.type(input, '{backspace}');
    expect(handleChange).toBeCalledWith(['tag1']);

    // Remove using X button
    const tag1Button = screen.getByRole('button', { name: /tag1/i });
    await user.click(tag1Button);
    expect(handleChange).toBeCalledWith(['tag2']);
  });

  it('should add new tag', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <TagInput
        name="test"
        value={['tag1']}
        onBlur={vi.fn()}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('textbox');

    // Accept tag using enter
    await user.type(input, 'tag2{enter}');
    expect(handleChange).toBeCalledWith(['tag1', 'tag2']);

    // Accept tag using comma
    await user.type(input, 'tag3,');
    expect(handleChange).toBeCalledWith(['tag1', 'tag3']);
  });
});
