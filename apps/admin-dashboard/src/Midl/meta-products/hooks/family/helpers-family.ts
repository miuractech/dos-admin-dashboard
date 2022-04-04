import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { orderBy } from 'firebase/firestore';
import { FirebaseRepository, reorder } from 'rxf-rewrite';

import { TMetaProductFamily } from '../../types';

export const metaProductFamilyRepo = new FirebaseRepository<TMetaProductFamily>(
  '/meta/products/family',
  firestore
);

export async function batchCommitFamily(
  arr: Array<TMetaProductFamily>,
  updatedBy: string
) {
  const batch = metaProductFamilyRepo.createBatch();
  arr.forEach((r) => {
    const updated = r;
    updated.updatedBy = updatedBy;
    metaProductFamilyRepo.batchCommitUpdate(batch, updated, updated.id);
  });
  await batch.commit();
}
