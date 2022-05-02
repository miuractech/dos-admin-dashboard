import { render } from '@testing-library/react';

import MfaFirebase from './mfa-firebase';

describe('MfaFirebase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfaFirebase />);
    expect(baseElement).toBeTruthy();
  });
});
