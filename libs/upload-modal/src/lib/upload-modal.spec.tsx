import { render } from '@testing-library/react';

import UploadModal from './upload-modal';

describe('UploadModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadModal />);
    expect(baseElement).toBeTruthy();
  });
});
