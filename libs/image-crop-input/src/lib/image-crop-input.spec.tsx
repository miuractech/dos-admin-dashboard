import { render } from '@testing-library/react';

import ImageCropInput from './image-crop-input';

describe('ImageCropInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageCropInput />);
    expect(baseElement).toBeTruthy();
  });
});
