import { render } from '@testing-library/react';

import Registration1 from './registration';

describe('Registration1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Registration1 />);
    expect(baseElement).toBeTruthy();
  });
});
