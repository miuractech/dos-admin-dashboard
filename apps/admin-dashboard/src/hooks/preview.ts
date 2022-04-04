import React from 'react';

export default function usePreviewImage(file: FileList | undefined) {
  const [preview, setPreview] = React.useState<string>('');

  React.useEffect(() => {
    if (file !== undefined) {
      const first = file[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(first);
    } else {
      setPreview('');
    }
  }, [file]);

  return { preview };
}
