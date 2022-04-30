import { render } from '@testing-library/react';

import VerifyPhone from './verify-phone';

describe('VerifyPhone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerifyPhone />);
    expect(baseElement).toBeTruthy();
  });
});
