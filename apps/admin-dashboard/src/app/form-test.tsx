import React, { useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UploadIcon } from '@admin/assets';

import usePreviewImage from '../hooks/preview';
import { UploadButton } from '../components/global/buttons';
import { storage } from '../config/firebase.config';
import FirebaseFileStorage from 'rxf-rewrite/dist/firebase/storage';

const schema = yup.object({
  imageField: yup
    .mixed()
    .required()
    .test('fileSize', 'File Size is too large', (value: FileList) => {
      return value.length === 1 && value[0].size <= 5242880;
    })
    .test('fileType', 'Unsupported File Format', (value: FileList) => {
      return (
        value.length === 1 &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
      );
    }),
});

const fileUpload = new FirebaseFileStorage(storage, 'test');

const FormTest: React.FC = () => {
  const { register, watch, handleSubmit, setValue } = useForm<{
    imageField: FileList | undefined;
  }>({
    resolver: yupResolver(schema),
  });

  const { preview } = usePreviewImage(watch('imageField'));
  const imageFieldRef = useRef<HTMLInputElement | null>(null);

  async function submit(data: { imageField: FileList | undefined }) {
    if (data.imageField !== undefined) {
      const res = await fileUpload.uploadFile(data.imageField[0]);
      console.log(res);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      {preview.length > 0 ? (
        <img
          src={preview}
          onClick={() => {
            setValue('imageField', undefined);
          }}
        />
      ) : (
        <>
          <input
            type="file"
            {...register('imageField')}
            ref={(e) => {
              register('imageField').ref(e);
              imageFieldRef.current = e;
            }}
          />
          <div style={{ height: 100, width: 100 }}>
            <UploadButton
              dimension={{ height: '100%', width: '100%' }}
              clickAction={() => {
                imageFieldRef.current?.click();
              }}
            >
              <UploadIcon />
            </UploadButton>
          </div>
        </>
      )}

      <button
        onClick={() => {
          handleSubmit(submit);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default FormTest;
