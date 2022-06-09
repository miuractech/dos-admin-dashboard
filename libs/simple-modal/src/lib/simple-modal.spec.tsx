import { render } from '@testing-library/react';

import SimpleModal from './simple-modal';

describe('SimpleModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleModal />);
    expect(baseElement).toBeTruthy();
  });
});
