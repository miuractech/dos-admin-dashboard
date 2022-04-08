import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { FirebaseRepository } from 'rxf-rewrite/dist';

import { TMetaProductSubCategory } from '../../types';

export const metaProductSubCategoryRepo =
  new FirebaseRepository<TMetaProductSubCategory>(
    '/meta/products/sub_category',
    firestore
  );
