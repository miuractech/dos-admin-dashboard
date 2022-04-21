import { firestore } from '../../../../config/firebase.config';
import { FirebaseRepository } from 'rxf-rewrite/dist';

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
