import { screen } from '@testing-library/react';

import { renderWithProviders } from 'test/utils';

import { Field } from 'components/forms/inputs/Field';

describe('Field', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <Field id="test" label="Test" error="Error" required />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom input', () => {
    const { asFragment } = renderWithProviders(
      <Field<'textarea'>
        id="test"
        label="Test"
        error="Error"
        required
        render={(props) => <textarea {...props} />}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should signal error state', () => {
    renderWithProviders(<Field id="test" label="Test" error="Error" />);

    const input = screen.getByRole('textbox', { name: /test/i });
    expect(input).toBeInvalid();

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Error');
  });

  it('should signal that field is required', () => {
    renderWithProviders(<Field id="test" label="Test" required />);

    const input = screen.getByRole('textbox', { name: /test/i });
    expect(input).toBeRequired();
  });
});
