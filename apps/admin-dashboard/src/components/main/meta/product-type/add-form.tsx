import { UploadIcon } from '@admin/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import usePreviewImage from '../../../../hooks/preview-image';
import React, { useEffect, useState } from 'react';
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
  setEditedMetaProductType,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import DOSInput from '../../../../UI/dosinput/dosinput';
import { Button, Chip, CircularProgress, IconButton, Menu, MenuItem, Popover, Slide, Tab, Tabs, Typography } from '@mui/material';
import useGetFamilies from '../../../../Midl/meta-products/hooks/family/get-families';
import { doc, getDoc, orderBy, setDoc } from 'firebase/firestore';
import { RootState } from '../../../../store';
import { BehaviorSubject } from 'rxjs';
import { TMetaProductFamily, TMetaProductSubCategory } from '../../../../Midl/meta-products/types';
import useGetCategories from '../../../../Midl/meta-products/hooks/category/get-categories';
import { setMetaProductCategoriesByFamily } from '../../../../Midl/meta-products/store/meta-product.category.slice';
import useGetSubCategories from '../../../../Midl/meta-products/hooks/sub-category/get-subcategories';
import { Clear, ColorLens } from '@mui/icons-material';
import AreYouSure from '../../../../UI/dosinput/AreYouSure';
import SideImages from './sideImages';
import InventoryManagement from './inventoryManagement';
import { app, firestore } from '../../../../config/firebase.config';
// import { productTypeRepo, uploadArrayOfFiles } from '../../../../Midl/meta-products/hooks/product-type/helpers';
import { MiuracImage } from '@miurac/image-upload';

const AddProductTypeForm = ({ onClose, item }: { onClose: any, item?: any }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, setError, getValues, unregister, clearErrors } = useForm<TAddFormSchema>({
    resolver: yupResolver(addProductFormSchema),
    defaultValues: item ? item : {
      color: [], // tyest-543-m-green
      size: []
    }
  });
  useSubject(showProductAddForm$);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0)
  const containerRef = React.useRef(null);
  const [basicInfo, setbasicInfo] = useState<any>({})
  const [imagesInfo, setImagesInfo] = useState<any>({})
  const [inventoryInfo, setInventoryInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const { asyncWrapper, } = useAsyncCall(
    addProductType,
    Boolean(showProductAddForm$.value),
    (res) => {
      if (res instanceof ApplicationErrorHandler) {
        console.log("res", res)
        dispatch(setMetaProductTypeAddError(res.errorObject));
      }
      else {
        dispatch(setAddedMetaProductType(res));
        dispatch(setMetaProductTypeAddError(null));
        setLoading(false)
        onClose()
      }
    }
  );

  const inventoryValidation = async (data: any) => {
    setLoading(true)
    const { sku, sideImages } = data
    const id = uuidv4()
    let skuError = false
    if (!item) {
      for (const color of Object.keys(sku)) {
        const colorData = sku[color]
        for (const size of Object.keys(colorData)) {
          const skuId = colorData[size]
          const query = doc(firestore, "inventory", skuId);
          const docSnap = await getDoc(query);
          if (docSnap.exists()) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setError(`sku.${color}.${size}`, { type: 'validate', message: 'sku already exist' })
            skuError = true
          }
        }
      }
    }
    if (skuError) {
      setLoading(false)
      return;
    }


    // const colorObj: any = {}
    // for (const color of Object.keys(sideImages)) {
    //   const sideData: any = {}
    //   const colorValues = sideImages[color]
    //   for (const side of Object.keys(colorValues)) {
    //     const sideValues = colorValues[side]
    //     if (!_.isEmpty(sideValues)) {
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       //@ts-ignore
    //       const url = sideValues.image ? [sideValues.image] : await uploadArrayOfFiles([[sideValues.imageFile]])
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       //@ts-ignore
    // const sideObj = { ...sideValues }
    //       delete sideObj['imageFile']
    // delete sideObj['icons']
    //       // console.log(sideObj);
    // sideData[side] = sideObj
    //   }
    // }
    // colorObj[color] = sideData
    // let sideData = {}
    // }
    // console.log({ ...data, sideImages: colorObj });
    if (!item) {
      asyncWrapper({
        id,
        form: { ...data },
        createdBy: 'Somnath',
        // counter:item?item.count:null,
        // editMode:Boolean(item)
      })
    } else {
      // const uploaded = typeof (data.displayImage) === 'string' ? [data.displayImage] : await uploadArrayOfFiles([data.displayImage]);
      const uploaded = data.displayImage
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      await productTypeRepo.updateOne({ ...item, ...data, displayImage: uploaded, sideImages: sideImages }, item.id)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      dispatch(setEditedMetaProductType({ ...item, ...data, displayImage: uploaded, sideImages: sideImages }));
      dispatch(setMetaProductTypeAddError(null))
      setLoading(false)
      onClose()
    }

  }

  const navigateAwayFromImages = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line no-case-declarations
    const { sideImages, color: allcolor } = data
    console.log(allcolor.map((c: any) => c.colorName), sideImages);

    // eslint-disable-next-line no-case-declarations
    let errorExist = false

    for (const color of allcolor.map((c: any) => c.colorName)) {
      let errorCount = 0
      if (sideImages) {
        const colorData = sideImages[color];
        if (colorData) {
          for (const side of Object.keys(colorData)) {
            const sideData = colorData[side]
            if (_.isEmpty(sideData)) {
              errorCount = errorCount + 1
            }
          }
        } else {
          errorCount = 6
        }
      } else {
        errorCount = 6
      }
      if (errorCount === 6) {
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
        <Tab disabled={tab !== 2} label="Stock Keeping Unit" {...a11yProps(2)} />
      </Tabs>
      <form
        className={styles['add-form-body']}
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
              setError={setError}
              getValue={getValues}
              clearErrors={clearErrors}
            />
            <ProductSizeField
              initial={getValues('size')}
              setValue={setValue}
            />
            <ProductColorField initial={getValues('color')} setValue={setValue} unregister={unregister} setError={setError}
              errors={errors}
              clearErrors={clearErrors} />
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
            <InventoryManagement
              basicInfo={basicInfo}
              register={register}
              getValue={getValues}
              // color={basicInfo.color}
              // size = {basicInfo.size}
              setValue={setValue}
              errors={errors}
            />
          </div>
        </Slide>

        <div className={styles['add-form-button']}>
          {!loading ? (
            <>
              {tab === 0 ? <Button
                variant='outlined'
                onClick={() => showProductAddForm$.next(false)}>
                Cancel
              </Button>
                : <Button
                  variant='outlined'
                  onClick={handleSubmit((data) => {
                    switch (tab) {
                      case 1:
                        setTab(0)
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

                </Button>}
              <Button
                // variant="contained"
                // color='secondary'
                onClick={handleSubmit((data) => {
                  console.log(data);
                  switch (tab) {
                    case 0:
                      if (data.color.length === 0) return
                      setbasicInfo(data)
                      setTab(1)

                      break;
                    case 1:
                      // eslint-disable-next-line no-case-declarations
                      const imageError = navigateAwayFromImages(data)
                      if (!imageError) setTab(2);
                      break;
                    case 2:
                      inventoryValidation(data)

                      // asyncWrapper({
                      //   id: uuidv4(),
                      //   form: { ...basicInfo, ...imagesInfo, ...data },
                      //   createdBy: 'Somnath',
                      // })
                      break;
                    default:
                      setTab(0)
                  }
                })}

                // type='submit'
                variant='contained'
              >
                {loading ? <CircularProgress /> : tab < 2 ? 'Next' : 'submit'}
              </Button>
            </>
          ) : (
            <ApplicationSpinner />
          )}
        </div>
      </form>
      {/* <AreYouSure open={discardChanges} discard={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setValue('sideImages', null)
        setTab(0)
        setDiscardChanges(false)
      }} onClose={() => setDiscardChanges(false)} text={'discard the Images?'} /> */}
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
const ProductMetaFields: React.FC<{ register: TRegister, watch: any, errors: any, getValue: any }> = ({ register, watch, errors, getValue }) => {
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
    if (watch('categoryId')) {
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
  setValue: any;
  watch: TWatch;
  errors: any
  showLable: boolean
  side?: string
  setError: any
  getValue: any
  clearErrors: any
}> = ({ register, getValue, setValue, watch, errors, showLable, side, setError, clearErrors }) => {

  const [preview, setPreview] = useState<string | null>(null)
  // useEffect(() => {

  //   if (watch('displayImage') === "" && watch('displayImage')?.length > 0 && !['image/jpeg', 'image/png', 'image/jpg', 'image/svg'].includes(watch('displayImage')[0].type)) {
  //     setError('displayImage', { type: 'type', message: 'must be a jpeg/png fileee' })
  //     // setValue('displayImage',undefined)
  //   } else {
  //     // clearErrors('displayImage')
  //   }
  //   // 

  // }, [watch('displayImage')])

  // const getPreview = usePreviewImage(watch('displayImage'));

  // const preview = typeof (getValue('displayImage')) === 'string' ? watch('displayImage') : getPreview.preview


  // const imageFieldRef = React.useRef<HTMLInputElement | null>();

  return (
    <div>
      <div className={styles['field-container']}>
        {showLable && <label>Display Image:</label>}
        <div>
          {preview ? (
            <div style={{ position: "relative", maxHeight: "200px", maxWidth: "200px" }}>
              <IconButton
                size="small"
                style={{
                  backgroundColor: '#888',
                  color: 'white',
                  position: "absolute",
                  right: "0px"
                }}
                onClick={() => { setValue('displayImage', ''); setPreview(null) }}
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
            // <div style={{ height: 100, width: 100 }}>
            //   <input
            //     type="file"
            //     accept="image/jpeg,image/png,image/jpg"
            //     style={{ display: 'none' }}
            //     {...register('displayImage')}
            //     ref={(e) => {
            //       register('displayImage').ref(e);
            //       imageFieldRef.current = e;
            //     }}
            //   />
            //   <UploadButton
            //     dimension={{ height: '100%', width: '100%' }}
            //     clickAction={() => {
            //       imageFieldRef.current?.click();
            //     }}
            //   >
            //     <UploadIcon />
            //   </UploadButton>
            // </div>
            <MiuracImage app={app} updateFirestore={false} editConfig={{ aspectX: 1, aspectY: 1 }} setUrlFunc={(url) => { setValue("displayImage", url); setPreview(url) }}
              buttonComponent={
                <div style={{ height: 100, width: 100 }}>
                  <UploadButton clickAction={() => console.log("upload")
                  }
                    dimension={{ height: '100%', width: '100%' }}
                  >
                    <UploadIcon />
                  </UploadButton>
                </div>
              }
            />
          )}
        </div>
      </div>
      {
        errors.displayImage && <Typography gutterBottom width="55%" fontSize={12} variant='subtitle1' color='error' textAlign="right" margin="0 auto 10px">
          {errors.displayImage?.message}
        </Typography>
      }
      {!showLable && <div style={{ marginTop: "15px", textAlign: "center" }}>{side}</div>}
    </div >
  );
};

export const ProductSizeField: React.FC<{
  setValue: TSetValue;
  initial: Array<string>;
}> = ({ setValue, initial, }) => {
  const [sizeLocal, setSizeLocal] = React.useState<Array<string>>(initial);
  const [showForm, setShowForm] = React.useState(false);
  const { register, watch, reset, formState: { errors }, handleSubmit, setError } = useForm<{ val: string }>({
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
                else {
                  setError(`val`, { type: 'validate', message: 'duplicate size name' }, { shouldFocus: false })
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
  unregister: any
  setError: any
  errors: any
  clearErrors: any
}> = ({ setValue, initial, unregister }) => {
  const [colorLocal, setColorLocal] =
    React.useState<Array<{ colorName: string; colorCode: string }>>(initial);
  const [showForm, setShowForm] = React.useState(false);
  const {
    register,
    watch,
    setValue: setValueInner,
    reset,
    formState: { errors },
    handleSubmit,
    setError
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
                unregister(`sideImages.${c.colorName}`)
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
                } else {
                  setError(`colorName`, { type: 'validate', message: 'duplicate color name' }, { shouldFocus: true })
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

// function colorObj(colorObj: any) {
//   throw new Error('Function not implemented.');
// }
