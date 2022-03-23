import { getFirestore, orderBy } from 'firebase/firestore';
import { FirebaseRepository, reorder } from 'rxf';

import { TMetaProductSubCategory } from '../../types';

export const metaProductSubCategoryRepo =
  new FirebaseRepository<TMetaProductSubCategory>(
    '/meta/products/sub_category',
    getFirestore()
  );

export async function batchCommitCategory(
  arr: Array<TMetaProductSubCategory>,
  updatedBy: string
) {
  const batch = metaProductSubCategoryRepo.createBatch();
  arr.forEach((r) => {
    r.updatedBy = updatedBy;
    metaProductSubCategoryRepo.batchCommitUpdate(batch, r, r.id);
  });
  await batch.commit();
}
