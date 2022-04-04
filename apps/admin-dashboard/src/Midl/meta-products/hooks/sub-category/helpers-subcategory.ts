import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { FirebaseRepository, reorder } from 'rxf';

import { TMetaProductSubCategory } from '../../types';

export const metaProductSubCategoryRepo =
  new FirebaseRepository<TMetaProductSubCategory>(
    '/meta/products/sub_category',
    firestore
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
