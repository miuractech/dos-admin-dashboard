import { getFirestore, runTransaction } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { from } from 'rxjs';

import {
  setEditedMetaProductSubCategory,
  setMetaProductSubCategoryEditError,
} from '../../store/meta-product.subcategory.slice';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

async function deleteSubCategoryAsyncWrapper(docId: string, userName: string) {
  const res = await runTransaction(getFirestore(), async () => {
    const doc = await metaProductSubCategoryRepo.updateOne(
      { status: 'deleted' },
      docId
    );
    if ('severity' in doc) return doc;
    else {
      return metaProductSubCategoryRepo.getOne(docId);
    }
  });
  return res;
}

export default function useDeleteSubCategory(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const dispatch = useDispatch();

  function deleteSubCategory(docId: string, userName: string) {
    setLoadingFlag(true);
    const obs$ = from(deleteSubCategoryAsyncWrapper(docId, userName));
    const sub = obs$.subscribe((res) => {
      if ('severity' in res) dispatch(setMetaProductSubCategoryEditError(res));
      else {
        dispatch(setEditedMetaProductSubCategory(res));
        dispatch(setMetaProductSubCategoryEditError(null));
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, deleteSubCategory };
}
