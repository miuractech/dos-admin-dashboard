import { render } from '@testing-library/react';

import Cmi from './cmi';

describe('Cmi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cmi />);
    expect(baseElement).toBeTruthy();
  });
});
