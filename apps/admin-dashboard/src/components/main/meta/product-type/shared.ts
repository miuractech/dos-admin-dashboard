import {
  checkHex,
  undefinedArrayCheck,
} from 'apps/admin-dashboard/src/utils/helpers/validation-custom';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BehaviorSubject } from 'rxjs';
import * as yup from 'yup';

export interface TAddFormSchema {
  name: string;
  description: string;
  familyId: string;
  categoryId: string;
  subcategoryId: string;
  displayImage: FileList | undefined;
  size: Array<string>;
  color: Array<{ colorName: string; colorCode: string }>;
  basePrice: number;
}

export type TRegister = UseFormRegister<TAddFormSchema>;
export type TSetValue = UseFormSetValue<TAddFormSchema>;
export type TWatch = UseFormWatch<TAddFormSchema>;

export const showProductAddForm$ = new BehaviorSubject(true);

export const colorFormSchema = yup.object({
  colorName: yup.string().required().min(3).max(20),
  colorCode: yup
    .string()
    .required()
    .test(
      'hex_check',
      'must be a valid hex code',
      (val) => val !== undefined && checkHex(val)
    ),
});

export const sizeFormSchema = yup.object({
  val: yup.string().required().min(1).max(10),
});

export const addProductFormSchema = yup.object({
  name: yup.string().required().min(3).max(20),
  description: yup.string().required().min(15).max(50),
  familyId: yup.string().required(),
  categoryId: yup.string().required(),
  subcategoryId: yup.string().required(),
  displayImage: yup
    .mixed()
    .required()
    .test(
      'fileSize',
      'file size is too large',
      (val: FileList | undefined) =>
        val !== undefined && val.length > 0 && val[0].size <= 1024 * 1024
    )
    .test(
      'fileType',
      'must be a jpeg/png file',
      (val: FileList | undefined) =>
        val !== undefined &&
        val.length > 0 &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(val[0].type)
    ),
  size: yup
    .array()
    .of(yup.string().required().min(1).max(10))
    .test('size_list_length', 'size must have one element', (val) =>
      val !== undefined ? undefinedArrayCheck(val) && val.length > 0 : false
    ),
  color: yup.array().of(colorFormSchema),
  basePrice: yup.number().required().min(50).max(1000),
});
