import { render } from '@testing-library/react';

import Registration1 from './registration1';

describe('Registration1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Registration1 />);
    expect(baseElement).toBeTruthy();
  });
});
