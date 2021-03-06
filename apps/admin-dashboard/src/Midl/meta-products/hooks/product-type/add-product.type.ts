import { firestore } from '../../../../config/firebase.config';
import { doc, runTransaction, setDoc } from 'firebase/firestore';
import { countRepo, productTypeRepo, uploadArrayOfFiles } from './helpers';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';
import { TMetaProductType } from '../../types';

export interface TAddFormSchema {
  name: string;
  description: string;
  familyId: string;
  categoryId: string;
  subcategoryId: string;
  displayImage: string | undefined;
  sizeChart:string | undefined; 
  size: Array<string>;
  color: Array<{ colorName: string; colorCode: string }>;
  basePrice: number;
}

export default async function addProductType(param: {
  id: string;
  form: any;
  createdBy: string;
}) {
  try {
    const { id, form, createdBy } = param;
    const res = runTransaction(firestore, async () => {
      // const uploaded = await uploadArrayOfFiles([form.displayImage]);

      // if (uploaded instanceof ApplicationErrorHandler) return uploaded;
      // else {
      const count = await countRepo.getOne('count');
      if (count instanceof ApplicationErrorHandler) return count;
      else {
        const writeable: any = {
          id: id,
          index: count.product_type,
          name: form.name,
          description: form.description,
          familyId: form.familyId,
          categoryId: form.categoryId,
          subcategoryId: form.subcategoryId,
          displayImage: form.displayImage,
          sizeChart: form.sizeChart,
          size: form.size,
          color: form.color,
          sideImages: form.sideImages,
          basePrice: form.basePrice,
          createdBy: createdBy,
          updatedBy: createdBy,
          status: 'published',
          sku: form.sku,
        };

        // const sides = Object.keys(form.sku).map((color: string) => {
        //   const colorData = form.sku[color]
        //   const side = Object.keys(colorData).map(async (size: string) => {
        //     const skuId = colorData[size]
        //     const query = doc(firestore, "inventory", skuId);
        //     await setDoc(query, { sku: skuId, inventory: 0, color, size, name: form.name, id });
        //   })
        // })
        await countRepo.updateOne({ product_type: count.product_type + 1 }, "count")

        return await productTypeRepo.createOne(writeable, id);
      }
      // }
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error.message
  }
}
