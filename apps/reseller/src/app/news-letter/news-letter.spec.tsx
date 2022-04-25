import { render } from '@testing-library/react';

import NewsLetter from './news-letter';

describe('NewsLetter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsLetter />);
    expect(baseElement).toBeTruthy();
  });
});
