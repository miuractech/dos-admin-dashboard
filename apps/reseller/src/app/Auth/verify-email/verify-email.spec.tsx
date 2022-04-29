import { render } from '@testing-library/react';

import VerifyEmail from './verify-email';

describe('VerifyEmail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerifyEmail />);
    expect(baseElement).toBeTruthy();
  });
});
