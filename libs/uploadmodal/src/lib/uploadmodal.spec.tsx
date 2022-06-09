import { render } from '@testing-library/react';

import Uploadmodal from './uploadmodal';

describe('Uploadmodal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Uploadmodal />);
    expect(baseElement).toBeTruthy();
  });
});
