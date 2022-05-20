import { render } from '@testing-library/react';

import DOSInput from './dosinput';

describe('DOSInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DOSInput />);
    expect(baseElement).toBeTruthy();
  });
});
