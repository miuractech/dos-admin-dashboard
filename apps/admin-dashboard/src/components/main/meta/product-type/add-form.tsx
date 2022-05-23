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
import { Button, Chip, IconButton, Menu, MenuItem, Popover, Typography } from '@mui/material';
import useGetFamilies from '../../../../Midl/meta-products/hooks/family/get-families';
import { orderBy } from 'firebase/firestore';
import { RootState } from '../../../../store';
import { BehaviorSubject } from 'rxjs';
import { TMetaProductFamily, TMetaProductSubCategory } from '../../../../Midl/meta-products/types';
import useGetCategories from '../../../../Midl/meta-products/hooks/category/get-categories';
import { setMetaProductCategoriesByFamily } from '../../../../Midl/meta-products/store/meta-product.category.slice';
import useGetSubCategories from '../../../../Midl/meta-products/hooks/sub-category/get-subcategories';
import { Clear, ColorLens } from '@mui/icons-material';

const AddProductTypeForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TAddFormSchema>({
    resolver: yupResolver(addProductFormSchema),
  });
  useSubject(showProductAddForm$);
  const dispatch = useDispatch();
  console.log(errors);

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
        onSubmit={handleSubmit((data) => {
          asyncWrapper({ id: uuidv4(), form: data, createdBy: 'Somnath' })
        }
        )}
      >
        <ProductNameField register={register} error={errors?.name ? errors?.name : {}} />
        <ProductDescriptionField register={register} error={errors?.description ? errors?.description : {}} />
        <ProductMetaFields register={register} watch={watch} />
        <ProductDisplayImage
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <ProductSizeField initial={[]} setValue={setValue} />
        <ProductColorField initial={[]} setValue={setValue} />
        <ProductBasePrice register={register} error={errors?.basePrice ? errors?.basePrice : {}} />

        <div className={styles['add-form-button']}>
          {!loading ? (
            <>
              <input
                // variant="contained"
                // color='secondary'
                // onClick={() => {
                //   handleSubmit((data) =>{
                //     console.log(data);                    
                //     asyncWrapper({
                //       id: uuidv4(),
                //       form: data,
                //       createdBy: 'Somnath',
                //     })}
                //   );
                // }}
                type='submit'
              />
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
  register: TRegister, error: { message?: string }
}> = ({ register, error }) => {
  return (
    <div className={styles['field-container']}>
      <label>Base Price:</label>
      <div>
        <DOSInput fullWidth forminput={{ ...register('basePrice') }} error={Boolean(error)}
          helperText={error.message} />
      </div>
    </div>
  );
};

export const ProductNameField: React.FC<{
  register: TRegister, error: { message?: string }
}> = ({ register, error }) => {
  return (
    <div className={styles['field-container']}>
      <label>Type Name:</label>
      <div>
        {/* <ApplicationTextInput {...register('name')} /> */}
        <DOSInput fullWidth forminput={{ ...register('name') }} error={Boolean(error)}
          helperText={error.message} />
      </div>
    </div>
  );
};

export const ProductDescriptionField: React.FC<{ register: TRegister, error: { message?: string } }> = ({
  register, error
}) => {
  return (
    <div className={styles['field-container']}>
      <label>Description:</label>
      <div>
        <DOSInput
          fullWidth
          multiline
          minRows={3}
          style={{ height: 'auto' }}
          InputProps={{ style: { height: 'auto', borderRadius: 25 } }}
          forminput={{ ...register('description') }}
          error={Boolean(error)}
          helperText={error.message}
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
        <label>Family :</label>
        <div>
          <DOSInput select fullWidth forminput={{ ...register('familyId') }}>
            {families.metaProductFamilies?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>Category :</label>
        <div>
          <DOSInput select fullWidth forminput={{ ...register('categoryId') }}>
            {metaProductCategoriesByFamily?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>SubCategory :</label>
        <div>
          <DOSInput select fullWidth forminput={{ ...register('subcategoryId') }}>
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
                right: "0px"
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
          <div style={{ height: 100, width: 100 }}>
            <input
              type="file"
              style={{ display: 'none', }}
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
          </div>
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
  const { register, watch, reset } = useForm<{ val: string }>({
    resolver: yupResolver(sizeFormSchema),
  });

  React.useEffect(() => {
    setValue('size', sizeLocal);
  }, [sizeLocal]);

  function submit() {
    if (!sizeLocal.includes(watch('val'))) {
      setSizeLocal((prev) => [...prev, watch('val')]);
      setShowForm(false)
      reset()
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sizeLocal.map((s) => (
            <Chip
              key={s}
              label={s}
              variant='outlined'
              color='info'
              onDelete={() => removeSizeItem(s)}
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
      <SimpleModal open={showForm} onClose={() => setShowForm(false)} >
        <div className={styles['inner-form-container']}>
          <Typography align='center' variant='h5' sx={{ marginBottom: 4 }} gutterBottom >
            Add new size
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <DOSInput placeholder='size name...' forminput={{ ...register('val') }} />
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
    reset
  } = useForm<{ colorName: string; colorCode: string }>({
    resolver: yupResolver(colorFormSchema),
  });
  const [colorPicker, setColorPicker] = React.useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = React.useState<any>(false);

  function submit() {
    if (
      colorLocal.filter((c) => c.colorName === watch('colorName')).length === 0
    ) {
      setColorLocal((prev) => [
        ...prev,
        { colorName: watch('colorName'), colorCode: watch('colorCode') },
      ]);
      setShowForm(false)
      reset()
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {colorLocal.map((c) => (
            <Chip
              key={c.colorName}
              label={c.colorName}
              variant='outlined'
              color='info'
              onDelete={() => {
                removeColorItem(c.colorName);
              }}
            // fontColor={c.colorCode}
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
      <SimpleModal open={showForm} onClose={() => setShowForm(false)}>
        <div className={styles['inner-form-container']}>
          <Typography align='center' variant='h5' sx={{ marginBottom: 4 }} gutterBottom >
            Add new Color
          </Typography>
          <div className={styles['field']}>
            <label>Name:</label>
            <DOSInput forminput={{ ...register('colorName') }} />
          </div>
          <div className={styles['field']}>
            <label>Code:</label>
            <DOSInput
              forminput={{ ...register('colorCode') }}
              InputProps={{
                endAdornment: <IconButton
                  onClick={(e) => setShowColorPicker(e.currentTarget)}
                >
                  <ColorLens />
                  {/* <ColorWheel /> */}
                </IconButton>,
                style: { height: '100%' },
                startAdornment:
                  <div
                    style={{ height: 20, width: 20, borderRadius: '50%', background: watch('colorCode') }}
                  />
              }}
            />

            <Popover
              anchorEl={showColorPicker}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} open={Boolean(showColorPicker)} onClose={() => setShowColorPicker(false)} >
              <ChromePicker
                color={colorPicker}
                onChange={(res) => {
                  setColorPicker(res.hex);
                }}
              />
            </Popover>

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
      </SimpleModal>
    </div>
  );
};

export default AddProductTypeForm;
