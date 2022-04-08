import { CloseCircle, ColorWheel, UploadIcon } from '@admin/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import usePreviewImage from 'apps/admin-dashboard/src/hooks/preview-image';
import React from 'react';
import { ChromePicker, SketchPicker } from 'react-color';
import { useForm } from 'react-hook-form';
import ApplicationButton, {
  ButtonWithoutStyles,
  UploadButton,
} from '../../../global/buttons';
import ApplicationCapsule from '../../../global/capsule';
import ApplicationModal from '../../../global/modal';
import {
  ApplicationOptionElement,
  ApplicationSelectInput,
} from '../../../global/select-input';
import ApplicationTextInput from '../../../global/text-input';

import styles from '../styles/product-type.module.scss';
import {
  addProductFormSchema,
  colorFormSchema,
  showProductAddForm$,
  sizeFormSchema,
  TAddFormSchema,
  TRegister,
  TSetValue,
  TWatch,
} from './shared';

const AddProductTypeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TAddFormSchema>({
    resolver: yupResolver(addProductFormSchema),
  });

  console.log(errors);

  return (
    <div className={styles['add-form']}>
      <div className={styles['add-form-heading']}>
        <div></div>
        <h3>Product Type</h3>
        <ButtonWithoutStyles
          clickAction={() => showProductAddForm$.next(false)}
        >
          <CloseCircle />
        </ButtonWithoutStyles>
      </div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className={styles['add-form-body']}>
          <ProductNameField register={register} fieldName="name" />
          <ProductDescriptionField register={register} />
          <ProductMetaFields register={register} />
          <ProductDisplayImage
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <ProductSizeField setValue={setValue} />
          <ProductColorField setValue={setValue} />
        </div>
      </form>
    </div>
  );
};

const ProductNameField: React.FC<{
  register: TRegister;
  fieldName: string;
}> = ({ register, fieldName }) => {
  return (
    <div className={styles['field-container']}>
      <label>Type Name:</label>
      <div>
        <ApplicationTextInput
          inputChangeFunc={register}
          fieldName={fieldName}
        ></ApplicationTextInput>
      </div>
    </div>
  );
};

const ProductDescriptionField: React.FC<{ register: TRegister }> = ({
  register,
}) => {
  return (
    <div className={styles['field-container']}>
      <label>Description:</label>
      <div>
        <textarea
          style={{ fontStyle: 'Montserrat' }}
          rows={10}
          cols={50}
          {...register('description')}
        />
      </div>
    </div>
  );
};

const ProductMetaFields: React.FC<{ register: TRegister }> = ({ register }) => {
  return (
    <>
      <div className={styles['field-container']}>
        <label>FamilyId:</label>
        <div>
          <ApplicationSelectInput {...register('familyId')}>
            <ApplicationOptionElement value="1">1</ApplicationOptionElement>
            <ApplicationOptionElement value="2">2</ApplicationOptionElement>
          </ApplicationSelectInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>CategoryId:</label>
        <div>
          <ApplicationSelectInput {...register('familyId')}>
            <ApplicationOptionElement value="1">1</ApplicationOptionElement>
            <ApplicationOptionElement value="2">2</ApplicationOptionElement>
          </ApplicationSelectInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>SubCategoryId:</label>
        <div>
          <ApplicationSelectInput {...register('familyId')}>
            <ApplicationOptionElement value="1">1</ApplicationOptionElement>
            <ApplicationOptionElement value="2">2</ApplicationOptionElement>
          </ApplicationSelectInput>
        </div>
      </div>
    </>
  );
};

const ProductDisplayImage: React.FC<{
  register: TRegister;
  setValue: TSetValue;
  watch: TWatch;
}> = ({ register, setValue, watch }) => {
  const { preview } = usePreviewImage(watch('displayImage'));
  const imageFieldRef = React.useRef<HTMLInputElement | null>();

  return (
    <div className={styles['field-container']}>
      <label>Display Image:</label>
      <div style={{ height: 100, width: 100 }}>
        {preview.length > 0 ? (
          <img
            src={preview}
            onClick={() => setValue('displayImage', undefined)}
            height="100%"
            width="100%"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <>
            <input
              type="file"
              style={{ display: 'none' }}
              {...register('displayImage')}
              ref={(e) => {
                register('displayImage').ref(e);
                imageFieldRef.current = e;
              }}
            />
            <UploadButton
              dimension={{ height: '100%', width: '100%' }}
              clickAction={() => {
                imageFieldRef.current?.click();
              }}
            >
              <UploadIcon />
            </UploadButton>
          </>
        )}
      </div>
    </div>
  );
};

const ProductSizeField: React.FC<{ setValue: TSetValue }> = ({ setValue }) => {
  const [sizeLocal, setSizeLocal] = React.useState<Array<string>>([]);
  const [showForm, setShowForm] = React.useState(false);
  const { register, watch } = useForm<{ val: string }>({
    resolver: yupResolver(sizeFormSchema),
  });

  React.useEffect(() => {
    setValue('size', sizeLocal);
  }, [sizeLocal]);

  function submit() {
    if (!sizeLocal.includes(watch('val'))) {
      setSizeLocal((prev) => [...prev, watch('val')]);
    }
  }

  function removeSizeItem(val: string) {
    setSizeLocal((prev) => {
      return prev.filter((p) => p !== val);
    });
  }

  return (
    <div className={styles['field-container']}>
      <label>Sizes:</label>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {sizeLocal.map((s) => (
            <ApplicationCapsule
              key={s}
              val={s}
              clickAction={(val) => removeSizeItem(val)}
            />
          ))}
          <ApplicationButton
            clickAction={() => {
              setShowForm(true);
            }}
            variant="default-not-padding"
          >
            <span style={{ fontSize: '1rem' }}>+</span>
          </ApplicationButton>
        </div>
      </div>
      <ApplicationModal mounted={showForm}>
        <div className={styles['inner-form-container']}>
          <ApplicationTextInput inputChangeFunc={register} fieldName="val" />
          <div className={styles['button-container']}>
            <ApplicationButton
              variant="cancel"
              clickAction={() => setShowForm(false)}
            >
              Cancel
            </ApplicationButton>
            <ApplicationButton
              variant="default-not-padding"
              clickAction={() => {
                submit();
              }}
            >
              Save
            </ApplicationButton>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

const ProductColorField: React.FC<{ setValue: TSetValue }> = ({ setValue }) => {
  const [colorLocal, setColorLocal] = React.useState<
    Array<{ colorName: string; colorCode: string }>
  >([]);
  const [showForm, setShowForm] = React.useState(false);
  const {
    register,
    watch,
    setValue: setValueInner,
  } = useForm<{ colorName: string; colorCode: string }>({
    resolver: yupResolver(colorFormSchema),
  });
  const [colorPicker, setColorPicker] = React.useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  function submit() {
    if (
      colorLocal.filter((c) => c.colorName === watch('colorName')).length === 0
    ) {
      setColorLocal((prev) => [
        ...prev,
        { colorName: watch('colorName'), colorCode: watch('colorCode') },
      ]);
    }
  }

  function removeColorItem(val: string) {
    setColorLocal((prev) => {
      return prev.filter((p) => p.colorName !== val);
    });
  }

  React.useEffect(() => {
    setValueInner('colorCode', colorPicker);
  }, [colorPicker]);

  React.useEffect(() => {
    setValue('color', colorLocal);
  }, [colorLocal]);

  return (
    <div className={styles['field-container']}>
      <label>Colors:</label>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {colorLocal.map((c) => (
            <ApplicationCapsule
              key={c.colorName}
              val={c.colorName}
              clickAction={(val) => {
                removeColorItem(val);
              }}
              fontColor={c.colorCode}
            />
          ))}
          <ApplicationButton
            variant="default-not-padding"
            clickAction={() => {
              setShowForm(true);
            }}
          >
            +
          </ApplicationButton>
        </div>
      </div>
      <ApplicationModal mounted={showForm}>
        <div className={styles['inner-form-container']}>
          <div className={styles['field']}>
            <label>Name:</label>
            <ApplicationTextInput
              inputChangeFunc={register}
              fieldName="colorName"
            />
          </div>
          <div className={styles['field']}>
            <label>Code:</label>
            <ApplicationTextInput
              inputChangeFunc={register}
              fieldName="colorCode"
            />
            <ButtonWithoutStyles
              clickAction={() => {
                setShowColorPicker((prev) => !prev);
              }}
            >
              <ColorWheel />
            </ButtonWithoutStyles>
            {showColorPicker && (
              <div style={{ position: 'absolute', top: 50, right: 0 }}>
                <ChromePicker
                  color={colorPicker}
                  onChange={(res) => {
                    setColorPicker(res.hex);
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles['button-container']}>
            <ApplicationButton
              variant="cancel"
              clickAction={() => setShowForm(false)}
            >
              Cancel
            </ApplicationButton>
            <ApplicationButton
              variant="default-not-padding"
              clickAction={() => {
                submit();
              }}
            >
              Save
            </ApplicationButton>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default AddProductTypeForm;
