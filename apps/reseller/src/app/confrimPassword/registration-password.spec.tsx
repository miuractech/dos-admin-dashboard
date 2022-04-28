import { render } from '@testing-library/react';

import RegistrationPassword from './registration-password';

describe('RegistrationPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationPassword />);
    expect(baseElement).toBeTruthy();
  });
});
