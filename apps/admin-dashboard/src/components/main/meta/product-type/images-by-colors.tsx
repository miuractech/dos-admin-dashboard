import { TMetaProductType } from '../../../../Midl/meta-products/types';
import React from 'react';
import * as yup from 'yup';
import { imageValidation } from './shared';
import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ApplicationOptionElement,
  ApplicationSelectInput,
} from '../../../global/select-input';
import usePreviewImage from '../../../../hooks/preview-image';
import ApplicationButton, { UploadButton } from '../../../global/buttons';
import { UploadIcon } from '@admin/assets';
import { useAsyncCall } from 'rxf-rewrite/dist';
import addImagesByColor from '../../../../Midl/meta-products/hooks/product-type/add-images-by-color';
import ApplicationSpinner from '../../../global/spinner';

const schema = yup.object({
  colorName: yup.string().required(),
  colorCode: yup.string().required(),
  left: imageValidation,
  right: imageValidation,
  top: imageValidation,
  bottom: imageValidation,
  front: imageValidation,
  back: imageValidation,
});

interface IFormShape {
  colorName: string;
  colorCode: string;
  left: FileList | undefined;
  right: FileList | undefined;
  top: FileList | undefined;
  bottom: FileList | undefined;
  front: FileList | undefined;
  back: FileList | undefined;
}

const ImagesByColor: React.FC<{ item: TMetaProductType }> = ({ item }) => {
  const { register, setValue, watch, handleSubmit } = useForm<IFormShape>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setValue('colorName', item.color[0].colorName);
  }, []);

  React.useEffect(() => {
    setValue(
      'colorCode',
      item.color.filter((c) => c.colorName === watch('colorName'))[0].colorCode
    );
  }, [watch('colorName')]);

  const { asyncWrapper, loading } = useAsyncCall(
    addImagesByColor,
    true,
    (res) => {
      console.log(res);
    }
  );

  function submit(data: IFormShape) {
    asyncWrapper({ id: item.id, form: data });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{
        margin: '.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ApplicationSelectInput {...register('colorName')}>
        {item.color.map((c) => (
          <ApplicationOptionElement key={c.colorName} value={c.colorName}>
            {c.colorName}
          </ApplicationOptionElement>
        ))}
      </ApplicationSelectInput>
      <div
        style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridRowGap: '20px',
          justifyContent: 'space-between'
        }}
      >
        <ImageField
          register={register}
          fieldName="left"
          label="Left"
          val={watch('left')}
          setValue={setValue}
        />
        <ImageField
          register={register}
          fieldName="right"
          label="Right"
          val={watch('right')}
          setValue={setValue}
        />
        <ImageField
          register={register}
          fieldName="top"
          label="Top"
          val={watch('top')}
          setValue={setValue}
        />
        <ImageField
          register={register}
          fieldName="bottom"
          label="Bottom"
          val={watch('bottom')}
          setValue={setValue}
        />
        <ImageField
          register={register}
          fieldName="front"
          label="Front"
          val={watch('front')}
          setValue={setValue}
        />
        <ImageField
          register={register}
          fieldName="back"
          label="Back"
          val={watch('back')}
          setValue={setValue}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <ApplicationSpinner />
        ) : (
          <div style={{ display: "flex", columnGap: "20px" }}>
            <ApplicationButton
              variant="cancel"
              clickAction={() => handleSubmit(submit)}
            >
              Cancel
            </ApplicationButton>
            <ApplicationButton
              variant="default"
              clickAction={() => handleSubmit(submit)}
            >
              Save
            </ApplicationButton>
          </div>
        )}
      </div>
    </form>
  );
};

const ImageField: React.FC<{
  register: UseFormRegister<any>;
  fieldName: string;
  label: string;
  val: FileList | undefined;
  setValue: UseFormSetValue<any>;
}> = ({ register, fieldName, label, val, setValue }) => {
  const { preview } = usePreviewImage(val);
  const imageFieldRef = React.useRef<HTMLInputElement | null>();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '150px 100px',
        gridTemplateRows: '80px',
      }}
    >
      <label style={{ fontFamily: 'Montserrat' }}>{label}:</label>
      {preview.length > 0 ? (
        <img
          src={preview}
          alt="uploaded_image"
          onClick={() => {
            setValue(fieldName, undefined);
          }}
          height="100%"
          width="80%"
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <>
          <input
            type="file"
            style={{ display: 'none' }}
            {...register(fieldName)}
            ref={(e) => {
              register(fieldName).ref(e);
              imageFieldRef.current = e;
            }}
          />
          <UploadButton
            dimension={{ height: '100%', width: '80%' }}
            clickAction={() => {
              imageFieldRef.current?.click();
            }}
          >
            <UploadIcon />
          </UploadButton>
        </>
      )}
    </div>
  );
};

export default ImagesByColor;
