import { firestore } from '../../../../config/firebase.config';
import { runTransaction } from 'firebase/firestore';
import {
  productTypeRepo,
  productTypeStorage,
  uploadArrayOfFiles,
} from './helpers';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';
import { TMetaProductType } from '../../types';

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

export default async function addProductType(param: {
  id: string;
  form: TAddFormSchema;
  createdBy: string;
}) {
  const { id, form, createdBy } = param;
  const res = runTransaction(firestore, async () => {
    const uploaded = await uploadArrayOfFiles([form.displayImage]);
    if (uploaded instanceof ApplicationErrorHandler) return uploaded;
    else {
      const writeable: TMetaProductType = {
        id: id,
        name: form.name,
        description: form.description,
        familyId: form.familyId,
        categoryId: form.categoryId,
        sub_category_id: form.subcategoryId,
        display_image: uploaded[0],
        size: form.size,
        color: form.color,
        color_options: [],
        base_price: form.basePrice,
        createdBy: createdBy,
        updatedBy: createdBy,
        status: 'published',
        sku: id,
      };
      return await productTypeRepo.createOne(writeable, id);
    }
  });
  return res;
}
