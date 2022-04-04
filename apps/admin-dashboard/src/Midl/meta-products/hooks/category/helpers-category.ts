import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { FirebaseRepository } from 'rxf-rewrite';

import { TMetaProductCategory } from '../../types';

export const metaProductCategoryRepo =
  new FirebaseRepository<TMetaProductCategory>(
    '/meta/products/category',
    firestore
  );

export async function batchCommitCategory(
  arr: Array<TMetaProductCategory>,
  updatedBy: string
) {
  const batch = metaProductCategoryRepo.createBatch();
  arr.forEach((r) => {
    r.updatedBy = updatedBy;
    metaProductCategoryRepo.batchCommitUpdate(batch, r, r.id);
  });
  await batch.commit();
}
