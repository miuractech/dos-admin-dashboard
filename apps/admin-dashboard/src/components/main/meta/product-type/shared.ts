import {
  checkHex,
  undefinedArrayCheck,
} from '../../../../utils/helpers/validation-custom';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BehaviorSubject } from 'rxjs';
import * as yup from 'yup';

export type TRegister = UseFormRegister<any>;
export type TSetValue = UseFormSetValue<any>;
export type TWatch = UseFormWatch<any>;

export const showProductAddForm$ = new BehaviorSubject<boolean | 'exit'>(false);

const hexValidation = yup
  .string()
  .required()
  .test(
    'hex_check',
    'must be a valid hex code',
    (val) => val !== undefined && checkHex(val)
  );

export const imageValidation = yup
  .mixed()
  .required()
  .test(
    'fileType',
    'must be a jpeg/png file',
    (val: FileList | undefined |string) =>{
      if(val !== undefined &&
        val.length > 0){
          if(typeof(val) === 'string'){
            return true
          }
          else if(['image/jpeg', 'image/png', 'image/jpg', 'image/svg'].includes(val[0].type)) return true;
          else return false;
        }
      else{
        return false
      }
    }
  );

export const colorFormSchema = yup.object({
  colorName: yup.string().required().min(3).max(20),
  colorCode: hexValidation,
});

export const sizeFormSchema = yup.object({
  val: yup.string().typeError('size must be string').required('size is required').min(1, 'size must be minimum if 1 character').max(10, 'size cannot exceed 10 characters'),
});

export const addProductFormSchema = yup.object({
  name: yup.string().required().min(3).max(20),
  description: yup.string().required().min(15).max(10000),
  familyId: yup.string().required(),
  categoryId: yup.string().required(),
  subcategoryId: yup.string().required(),
  displayImage: imageValidation,
  size: yup
    .array()
    .of(yup.string().required().min(1).max(10))
    .test('size_list_length', 'size must have one element', (val) =>
      val !== undefined ? undefinedArrayCheck(val) && val.length > 0 : false
    ),
  color: yup.array().of(colorFormSchema),
  basePrice: yup.number().required().min(50).max(1000),
});

export const selectedEditOption$ = new BehaviorSubject('BASIC_INFO');
