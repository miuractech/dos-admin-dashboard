import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TMetaProductType } from '../../../../Midl/meta-products/types';

import styles from '../styles/product-type.module.scss';
import { colorFormSchema } from './shared';
import { undefinedArrayCheck } from '../../../../utils/helpers/validation-custom';
import { useForm } from 'react-hook-form';
import {
  ProductColorField,
  ProductDescriptionField,
  ProductNameField,
  ProductSizeField,
} from './add-form';

const schema = yup.object({
  name: yup.string().required().min(3).max(20),
  description: yup.string().required().min(15).max(50),
  size: yup
    .array()
    .of(yup.string().required().min(1).max(10))
    .test('size_list_length', 'size must have one element', (val) =>
      val !== undefined ? undefinedArrayCheck(val) && val.length > 0 : false
    ),
  color: yup.array().of(colorFormSchema),
});

interface IFormShape {
  name: string;
  description: string;
  size: Array<string>;
  color: Array<{ colorName: string; colorCode: string }>;
}

const BasicInfo: React.FC<{ item: TMetaProductType }> = ({ item }) => {
  const { register, setValue, handleSubmit, formState: { errors }, unregister } = useForm<IFormShape>({
    resolver: yupResolver(schema),
  });

  const onMountFieldSetter = React.useCallback(() => {
    setValue('name', item.name);
    setValue('description', item.description);
    setValue('size', item.size);
    setValue('color', item.color);
  }, []);

  React.useEffect(() => {
    onMountFieldSetter();
  }, [onMountFieldSetter]);

  return (
    <div
      style={{
        fontFamily: 'Montserrat',
      }}
    >
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className={styles['add-form-body']}
      >
        <ProductNameField register={register} error={errors?.name ? errors?.name : {}} />
        <ProductDescriptionField register={register} error={errors?.description ? errors?.description : {}} />
        <ReadOnlyField label="FamilyId" val={item.familyId} />
        <ReadOnlyField label="CategoryId" val={item.categoryId} />
        <ReadOnlyField label="SubCategoryId" val={item.sub_category_id} />
        <div className={styles['field-container']}>
          <label>Display Image:</label>
          <img
            src={item.display_image}
            height={100}
            width={100}
            style={{ objectFit: 'cover' }}
            alt=""
          />
        </div>
        {/* <ProductSizeField initial={item.size} setValue={setValue} /> */}
        {/* <ProductColorField initial={item.color} setValue={setValue} unregister={unregister} /> */}
      </form>
    </div>
  );
};

const ReadOnlyField: React.FC<{ label: string; val: string }> = ({
  label,
  val,
}) => {
  return (
    <div className={styles['field-container']}>
      <label>{label}:</label>
      <div>
        <p>{val}</p>
      </div>
    </div>
  );
};

export default BasicInfo;