import { CloseCircle, ColorWheel, UploadIcon } from '@admin/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import usePreviewImage from '../../../../hooks/preview-image';
import React from 'react';
import { ChromePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import ApplicationButton, {
  ButtonWithoutStyles,
  UploadButton,
} from '../../../global/buttons';
import ApplicationCapsule from '../../../global/capsule';
import ApplicationModal from '../../../global/modal';
import SimpleModal from '../../../global/simpleModal/modal';
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
  TRegister,
  TSetValue,
  TWatch,
} from './shared';
import addProductType, {
  TAddFormSchema,
} from '../../../../Midl/meta-products/hooks/product-type/add-product.type';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import {
  ApplicationErrorHandler,
  useAsyncCall,
  useSubject,
} from 'rxf-rewrite/dist';
import ApplicationSpinner from '../../../global/spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMetaProductTypeAddError,
  setAddedMetaProductType,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import DOSInput from '../../../../UI/dosinput/dosinput';
import { IconButton, Menu, MenuItem } from '@mui/material';
import useGetFamilies from '../../../../Midl/meta-products/hooks/family/get-families';
import { orderBy } from 'firebase/firestore';
import { RootState } from '../../../../store';
import { BehaviorSubject } from 'rxjs';
import { TMetaProductFamily, TMetaProductSubCategory } from '../../../../Midl/meta-products/types';
import useGetCategories from '../../../../Midl/meta-products/hooks/category/get-categories';
import { setMetaProductCategoriesByFamily } from '../../../../Midl/meta-products/store/meta-product.category.slice';
import useGetSubCategories from '../../../../Midl/meta-products/hooks/sub-category/get-subcategories';
import { Clear } from '@mui/icons-material';

const AddProductTypeForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<TAddFormSchema>({
    resolver: yupResolver(addProductFormSchema),
  });
  useSubject(showProductAddForm$);
  const dispatch = useDispatch();

  const { loading, asyncWrapper } = useAsyncCall(
    addProductType,
    showProductAddForm$.value,
    (res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductTypeAddError(res.errorObject));
      else {
        dispatch(setAddedMetaProductType(res));
        dispatch(setMetaProductTypeAddError(null));
      }
    }
  );

  return (
    <div className={styles['add-form']}>
      <div className={styles['add-form-heading']}>
        <div></div>
        <h3>Product Type</h3>
        <div />
        {/* <ButtonWithoutStyles
          clickAction={() => showProductAddForm$.next(false)}
        >
          <CloseCircle />
        </ButtonWithoutStyles> */}
      </div>
      <form
        className={styles['add-form-body']}
        onSubmit={handleSubmit((data) =>
          asyncWrapper({ id: uuidv4(), form: data, createdBy: 'Somnath' })
        )}
      >
        <ProductNameField register={register} />
        <ProductDescriptionField register={register} />
        <ProductMetaFields register={register} watch={watch} />
        <ProductDisplayImage
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <ProductSizeField initial={[]} setValue={setValue} />
        <ProductColorField initial={[]} setValue={setValue} />
        <ProductBasePrice register={register} />

        <div className={styles['add-form-button']}>
          {!loading ? (
            <>
              <ApplicationButton
                variant="default-not-padding"
                clickAction={() => {
                  handleSubmit((data) =>
                    asyncWrapper({
                      id: uuidv4(),
                      form: data,
                      createdBy: 'Somnath',
                    })
                  );
                }}
              >
                Save
              </ApplicationButton>
              <ApplicationButton
                variant="cancel"
                clickAction={() => {
                  showProductAddForm$.next(false);
                }}
              >
                Cancel
              </ApplicationButton>
            </>
          ) : (
            <ApplicationSpinner />
          )}
        </div>
      </form>
    </div>
  );
};

const ProductBasePrice: React.FC<{
  register: TRegister;
}> = ({ register }) => {
  return (
    <div className={styles['field-container']}>
      <label>Base Price:</label>
      <div>
        <ApplicationTextInput {...register('basePrice')} />
      </div>
    </div>
  );
};

export const ProductNameField: React.FC<{
  register: TRegister;
}> = ({ register }) => {
  return (
    <div className={styles['field-container']}>
      <label>Type Name:</label>
      <div>
        {/* <ApplicationTextInput {...register('name')} /> */}
        <DOSInput fullWidth forminput={{ ...register('name') }} />
      </div>
    </div>
  );
};

export const ProductDescriptionField: React.FC<{ register: TRegister }> = ({
  register,
}) => {
  return (
    <div className={styles['field-container']}>
      <label>Description:</label>
      <div>
        {/* <textarea
          style={{ fontStyle: 'Montserrat' }}
          rows={10}
          cols={50}
          {...register('description')}
        /> */}
        <DOSInput
          fullWidth
          multiline
          minRows={3}
          style={{ height: 'auto' }}
          InputProps={{ style: { height: 'auto', borderRadius: 25 } }}
          forminput={{ ...register('description') }}
        />
      </div>
    </div>
  );
};
const selectedProductFamily$ = new BehaviorSubject<TMetaProductFamily | null>(
  null
);
const ProductMetaFields: React.FC<{ register: TRegister, watch: any }> = ({ register, watch }) => {
  const { getFamilies } = useGetFamilies(true);
  const dispatch = useDispatch();
  useSubject(selectedProductFamily$);
  const { getSubCategories } = useGetSubCategories(true);
  const families = useSelector((state: RootState) => state.metaProductFamily);
  const { getCategories } = useGetCategories(true);
  const {
    metaProductCategories,
    metaProductCategoriesByFamily,
  } = useSelector((state: RootState) => state.metaProductCategory);
  const { metaProductSubCategories } = useSelector(
    (state: RootState) => state.metaProductSubCategory
  );
  const [localSubCategory, setLocalSubCategory] = React.useState<
    Array<TMetaProductSubCategory>
  >([]);
  React.useEffect(() => {
    families.metaProductFamilies.length === 0 &&
      getFamilies([orderBy('index')]);
  }, [families.metaProductFamilies.length, getFamilies]);
  React.useEffect(() => {
    metaProductCategories.length === 0 && getCategories([orderBy('index')]);
    families.metaProductFamilies.length > 0 &&
      selectedProductFamily$.next(families.metaProductFamilies[0]);
  }, []);
  React.useEffect(() => {
    metaProductSubCategories.length === 0 &&
      getSubCategories([orderBy('index')]);
    families.metaProductFamilies.length > 0 &&
      selectedProductFamily$.next(families.metaProductFamilies[0]);
  }, []);
  React.useEffect(() => {
    const filtered = metaProductCategories.filter(
      (a) => a.familyId === watch('familyId')
    );
    dispatch(setMetaProductCategoriesByFamily(_.orderBy(filtered, 'index')));
  }, [selectedProductFamily$.value, metaProductCategories, watch('familyId')]);
  React.useEffect(() => {
    const filtered = metaProductSubCategories.filter(
      (s) => s.familyId === selectedProductFamily$.value?.id
    );
    setLocalSubCategory(_.orderBy(filtered, 'index'));
  }, [watch('familyId'), watch('categoryId')]);

  return (
    <>
      <div className={styles['field-container']}>
        <label>FamilyId:</label>
        <div>
          <DOSInput select fullWidth {...register('familyId')}>
            {families.metaProductFamilies?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>CategoryId:</label>
        <div>
          <DOSInput select fullWidth {...register('categoryId')}>
            {metaProductCategoriesByFamily?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>SubCategoryId:</label>
        <div>
          <DOSInput select fullWidth {...register('categoryId')}>
            {(localSubCategory.length > 0) && localSubCategory.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
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
      <div>

        {preview.length > 0 ? (
          <div style={{ position: "relative", maxHeight: "200px", maxWidth: "200px" }}>
            <IconButton
              size="small"
              style={{
                backgroundColor: '#888',
                color: 'white',
                position: "absolute",
                right: "0px",
              }}
              onClick={() => setValue('displayImage', undefined)}
            >
              <Clear />
            </IconButton>
            < img
              src={preview}
              style={{
                objectFit: 'cover', maxHeight: "200px", maxWidth: "200px", display: "block"
              }}
              alt=""
            />
          </div>
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

export const ProductSizeField: React.FC<{
  setValue: TSetValue;
  initial: Array<string>;
}> = ({ setValue, initial }) => {
  const [sizeLocal, setSizeLocal] = React.useState<Array<string>>(initial);
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
      <SimpleModal open={showForm} onClose={() => setShowForm(false)} style={{}}>
        <div className={styles['inner-form-container']}>
          <ApplicationTextInput {...register('val')} />
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
      </SimpleModal>
    </div >
  );
};

export const ProductColorField: React.FC<{
  setValue: TSetValue;
  initial: Array<{ colorName: string; colorCode: string }>;
}> = ({ setValue, initial }) => {
  const [colorLocal, setColorLocal] =
    React.useState<Array<{ colorName: string; colorCode: string }>>(initial);
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
      {/* <SimpleModal open={showForm} onClose={() => setShowForm(false)} style={{}}></SimpleModal> */}
      <ApplicationModal mounted={showForm}>
        <div className={styles['inner-form-container']}>
          <div className={styles['field']}>
            <label>Name:</label>
            <ApplicationTextInput {...register('colorName')} />
          </div>
          <div className={styles['field']}>
            <label>Code:</label>
            <ApplicationTextInput {...register('colorCode')} />
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
