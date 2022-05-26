import { CloseCircle, ColorWheel, UploadIcon } from '@admin/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import usePreviewImage from '../../../../hooks/preview-image';
import React, { useState } from 'react';
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
import { Button, Chip, IconButton, Menu, MenuItem, Popover, Slide, Tab, Tabs, Typography } from '@mui/material';
import useGetFamilies from '../../../../Midl/meta-products/hooks/family/get-families';
import { orderBy } from 'firebase/firestore';
import { RootState } from '../../../../store';
import { BehaviorSubject } from 'rxjs';
import { TMetaProductFamily, TMetaProductSubCategory } from '../../../../Midl/meta-products/types';
import useGetCategories from '../../../../Midl/meta-products/hooks/category/get-categories';
import { setMetaProductCategoriesByFamily } from '../../../../Midl/meta-products/store/meta-product.category.slice';
import useGetSubCategories from '../../../../Midl/meta-products/hooks/sub-category/get-subcategories';
import { Clear, ColorLens } from '@mui/icons-material';
import AreYouSure from '../../../../UI/dosinput/AreYouSure';
import Grid from '@mui/material/Grid';
import SideImages from './sideImages';

const AddProductTypeForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError, getValues } = useForm<TAddFormSchema>({
    resolver: yupResolver(addProductFormSchema),
    defaultValues: {
      basePrice: 250,
      subcategoryId: 'cfa6ce6c-8616-4b00-aebf-de68d8c575fd',
      categoryId: '12d69ae6-da63-4c0e-9757-536f64f10a76',
      familyId: '6276ef56-e822-4cf5-9f39-b03a7db5dfcd',
      color: [{ colorCode: '#444444', colorName: 'ref' }],
      description: 'we ferg a gha ha arhtae hga h',
      name: 'tyest',
      size: ['xs', 'md']

    }
  });
  useSubject(showProductAddForm$);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0)
  const containerRef = React.useRef(null);
  const [basicInfo, setbasicInfo] = useState<any>({})
  const [imagesInfo, setImagesInfo] = useState<any>({})
  const [inventoryInfo, setInventoryInfo] = useState<any>({})
  const [discardChanges, setDiscardChanges] = useState(false)
  const { loading, asyncWrapper } = useAsyncCall(
    addProductType,
    Boolean(showProductAddForm$.value),
    (res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductTypeAddError(res.errorObject));
      else {
        dispatch(setAddedMetaProductType(res));
        dispatch(setMetaProductTypeAddError(null));
      }
    }
  );
  // console.log(basicInfo, imagesInfo, inventoryInfo, errors);
    console.log('errors',errors,watch());
    const navigateAwayFromImages = (data:any) => {
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      // eslint-disable-next-line no-case-declarations
                      const { sideImages } = data
                      console.log('next data', sideImages);
                      // eslint-disable-next-line no-case-declarations
                      let errorExist = false 
                     
                      for(const color of Object.keys(sideImages)){
                        const colorData = sideImages[color];
                        let errorCount = 0
                        for(const side of Object.keys(colorData)){
                          const sideData = colorData[side]
                          if(_.isEmpty(sideData)) {
                            errorCount=errorCount+1
                          }else{
                            console.log(color,side)
                          }
                        }
                        if(errorCount === 6){
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-ignore
                          setError(`sideImages.${color}`, { type: "required" }, { shouldFocus: false })
                          errorExist = true
                        }
                      }
                      return errorExist
    }


  return (
    <div className={styles['add-form']} ref={containerRef}>
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
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        aria-label="product type tabs"
        variant='fullWidth'
        textColor='primary'
      >
        <Tab disabled={tab !== 0} label="Basic Info" {...a11yProps(0)} />
        <Tab disabled={tab !== 1} label="Side Images" {...a11yProps(1)} />
        <Tab disabled={tab !== 2} label="Inventory" {...a11yProps(2)} />
      </Tabs>
      <form
        className={styles['add-form-body']}

      // onSubmit={handleSubmit((data) => {
      //   asyncWrapper({ id: uuidv4(), form: data, createdBy: 'Somnath' })
      // }
      // )}
      >
        <Slide direction="right" in={tab === 0} mountOnEnter unmountOnExit container={containerRef.current} >
          <div

          >
            <ProductNameField register={register} error={errors?.name ? errors?.name : {}} />
            <ProductDescriptionField register={register} error={errors?.description ? errors?.description : {}} />
            <ProductMetaFields register={register} watch={watch} errors={errors} getValue={getValues} />
            <ProductDisplayImage
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              showLable={true}
            />
            <ProductSizeField initial={getValues('size')} setValue={setValue} />
            <ProductColorField initial={getValues('color')} setValue={setValue} />
            <ProductBasePrice register={register} error={errors?.basePrice ? errors?.basePrice : {}} />
          </div>
        </Slide>

        <Slide direction="right" in={tab === 1} mountOnEnter unmountOnExit container={containerRef.current}>
          <div>
            <SideImages
              colours={basicInfo.color}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              getValues={getValues}
            />
          </div>
        </Slide>

        <Slide direction="right" in={tab === 2} mountOnEnter unmountOnExit container={containerRef.current}>
          <div
          >
            inventoruy
          </div>
        </Slide>

        <div className={styles['add-form-button']}>
          {!loading ? (
            <>
              <Button
                variant='outlined'
                onClick={handleSubmit((data) => {
                  switch (tab) {
                    case 0:
                      showProductAddForm$.next('exit');
                      break;
                    case 1:
                      // eslint-disable-next-line no-case-declarations
                      const imageError = navigateAwayFromImages(data)
                      if(!imageError){
                        setDiscardChanges(true)
                      }
                      // setTab(0)
                      break;
                    case 2:
                      setTab(t => t - 1)
                      break;
                    default:
                      setTab(0)
                  }
                })}

              >
                {tab === 0 ? 'Cancel' : 'back'}

              </Button>
              <Button
                // variant="contained"
                // color='secondary'
                onClick={handleSubmit((data) => {
                  switch (tab) {
                    case 0:
                      setbasicInfo(data)
                      setTab(1)
                      break;
                    case 1:
                      // eslint-disable-next-line no-case-declarations
                      const imageError = navigateAwayFromImages(data)
                      if(!imageError) setTab(2);
                      break;
                    case 2:
                      asyncWrapper({
                        id: uuidv4(),
                        form: { ...basicInfo, ...imagesInfo, ...data },
                        createdBy: 'Somnath',
                      })
                      break;
                    default:
                      setTab(0)
                  }
                })}

                // type='submit'
                variant='contained'
              >
                {tab < 2 ? 'Next' : 'submit'}
              </Button>
            </>
          ) : (
            <ApplicationSpinner />
          )}
        </div>
      </form>
      <AreYouSure open={discardChanges} discard={()=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setValue('sideImages',null)
        setTab(0)
        setDiscardChanges(false)
      }} onClose={()=>setDiscardChanges(false)} text={'discard the Images?'} />
      {showProductAddForm$.value === 'exit' && <AreYouSure text={'discard your changes?'} open={showProductAddForm$.value === 'exit'} onClose={() => showProductAddForm$.next(true)} discard={() => showProductAddForm$.next(false)} />}
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
        <DOSInput fullWidth forminput={{ ...register('basePrice') }} error={Boolean(error.message)}
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
        <DOSInput
          fullWidth
          forminput={{ ...register('name') }}
          error={Boolean(error.message)}
          helperText={error.message}
        />
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
          // style={{ height: 'auto' }}
          InputProps={{ style: { height: 'auto', borderRadius: 16, padding: '12px 0px' } }}
          forminput={{ ...register('description') }}
          error={Boolean(error.message)}
          helperText={error.message}
        />
      </div>
    </div>
  );
};
const selectedProductFamily$ = new BehaviorSubject<TMetaProductFamily | null>(
  null
);
const ProductMetaFields: React.FC<{ register: TRegister, watch: any, errors: any, getValue:any }> = ({ register, watch, errors,getValue }) => {
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
    metaProductSubCategories.length === 0 &&
      getSubCategories([orderBy('index')]);
    metaProductCategories.length === 0 && getCategories([orderBy('index')]);
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
    console.log(getValue('categoryId'));
    if(watch('categoryId')){
      const filtered = metaProductSubCategories.filter(
        (s) => s.categoryId === watch('categoryId')
      );
      setLocalSubCategory(_.orderBy(filtered, 'index'));
    }
  }, [watch('familyId'), watch('categoryId')]);


  return (
    <>
      <div className={styles['field-container']}>
        <label>Family :</label>
        <div>
          <DOSInput defaultValue={getValue('familyId')} error={errors.familyId} helperText={errors.familyId?.message} select fullWidth forminput={{ ...register('familyId') }}>
            {families.metaProductFamilies?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>Category :</label>
        <div>
          <DOSInput defaultValue={getValue('categoryId')} error={errors.categoryId} helperText={errors.categoryId?.message} select fullWidth forminput={{ ...register('categoryId') }}>
            {metaProductCategoriesByFamily?.map(({ id, name }) =>
              <MenuItem value={id}>{name}</MenuItem>
            )}
          </DOSInput>
        </div>
      </div>
      <div className={styles['field-container']}>
        <label>SubCategory :</label>
        <div>
          <DOSInput defaultValue={getValue('subcategoryId')} error={errors.subcategoryId} helperText={errors.subcategoryId?.message} select fullWidth forminput={{ ...register('subcategoryId') }}>
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
  errors: any
  showLable: boolean
  side?: string
}> = ({ register, setValue, watch, errors, showLable, side }) => {
  const { preview } = usePreviewImage(watch('displayImage'));
  const imageFieldRef = React.useRef<HTMLInputElement | null>();

  return (
    <div>
      <div className={styles['field-container']}>
        {showLable && <label>Display Image:</label>}
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
      {errors.displayImage && <Typography fontSize={12} variant='subtitle1' color='error' >
        {errors.displayImage?.message}
      </Typography>}
      {!showLable && <div style={{ marginTop: "15px", textAlign: "center" }}>{side}</div>}
    </div>
  );
};

export const ProductSizeField: React.FC<{
  setValue: TSetValue;
  initial: Array<string>;
}> = ({ setValue, initial }) => {
  const [sizeLocal, setSizeLocal] = React.useState<Array<string>>(initial);
  const [showForm, setShowForm] = React.useState(false);
  const { register, watch, reset, formState: { errors }, handleSubmit } = useForm<{ val: string }>({
    resolver: yupResolver(sizeFormSchema),
  });

  React.useEffect(() => {
    setValue('size', sizeLocal);
  }, [sizeLocal]);


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
            clickAction={(e) => {
              e.preventDefault()
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
            <DOSInput error={Boolean(errors.val)} helperText={errors.val?.message} placeholder='size name...' forminput={{ ...register('val') }} />
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
              clickAction={handleSubmit((data) => {
                if (!sizeLocal.includes(data.val)) {
                  setSizeLocal((prev) => [...prev, data.val]);
                  setShowForm(false)
                  reset()
                }
              })}
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
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<{ colorName: string; colorCode: string }>({
    resolver: yupResolver(colorFormSchema),
  });
  const [colorPicker, setColorPicker] = React.useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = React.useState<any>(false);
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
            clickAction={(e) => {
              e.preventDefault()
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
            <DOSInput error={Boolean(errors.colorName)} helperText={errors.colorName?.message} forminput={{ ...register('colorName') }} />
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
              clickAction={handleSubmit((data) => {
                if (
                  colorLocal.filter((c) => c.colorName === data.colorName).length === 0
                ) {
                  setColorLocal((prev) => [
                    ...prev,
                    { colorName: data.colorName, colorCode: data.colorCode },
                  ]);
                  setShowForm(false)
                  reset()
                }
              })}
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


function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}