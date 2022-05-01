import { render } from '@testing-library/react';

import ReactFlags from './react-flags';

describe('ReactFlags', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactFlags />);
    expect(baseElement).toBeTruthy();
  });
});
