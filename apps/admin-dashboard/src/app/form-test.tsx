import React, { useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import usePreviewImage from '../hooks/preview';
import { UploadButton } from '../components/global/buttons';
import { UploadIcon } from '@admin/assets';

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

const FormTest: React.FC = () => {
  const { register, watch, handleSubmit, setValue } = useForm<{
    imageField: FileList | undefined;
  }>({
    resolver: yupResolver(schema),
  });

  const { preview } = usePreviewImage(watch('imageField'));
  const imageFieldRef = useRef<HTMLInputElement | null>(null);

  function submit(data: { imageField: FileList | undefined }) {
    console.log(data);
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
