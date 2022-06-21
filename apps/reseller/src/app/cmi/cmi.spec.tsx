import { render } from '@testing-library/react';

import CMI from './cmi';

describe('CMI', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CMI />);
    expect(baseElement).toBeTruthy();
  });
});
