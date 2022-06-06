import React from 'react';

export default function usePreviewImage(inputFile: FileList | undefined | string) {
  const [preview, setPreview] = React.useState<string>('');

  React.useEffect(() => {
    if (inputFile !== undefined && typeof (inputFile) !== 'string' && inputFile.length > 0) {
      const first = inputFile[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(first);
    } else {
      setPreview('');
    }
  }, [inputFile]);

  return { preview };
}
