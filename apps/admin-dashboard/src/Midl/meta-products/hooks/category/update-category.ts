import { firestore } from '../../../../config/firebase.config';
import { runTransaction, where } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationError } from 'rxf-rewrite/dist';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import {
  setEditedMetaProductCategory,
  setMetaProductCategoryEditError,
} from '../../store/meta-product.category.slice';
import { metaProductCategoryRepo } from './helpers-category';

async function updateCategoryNameAsyncWrapper(
  payload: { name: string; updatedBy: string; familyId: string },
  docId: string
) {
  const res = await runTransaction(firestore, async () => {
    const docs = await metaProductCategoryRepo.getAll([
      where('familyId', '==', payload.familyId),
    ]);

    if (docs instanceof ApplicationErrorHandler) return docs;
    else if (docs.filter((d) => d.name === payload.name).length === 0) {
      return metaProductCategoryRepo.updateOne(payload, docId);
    } else {
      return new ApplicationError().handleCustomError(
        'Conflict/Limit',
        'Naming Conflict or Limit',
        'Naming Conflicts or Limit of Documents has Exceeded',
        'error'
      );
    }
  });
  return res;
}

export default function useUpdateCategory(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const dispatch = useDispatch();

  function completedSetter(val: boolean) {
    setCompleted(val);
  }

  function updateCategoryName(
    payload: { name: string; updatedBy: string; familyId: string },
    docId: string
  ) {
    setLoadingFlag(true);
    setCompleted(false);
    const obs$ = from(updateCategoryNameAsyncWrapper(payload, docId));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductCategoryEditError(res.errorObject));
      else {
        dispatch(setEditedMetaProductCategory(res));
        dispatch(setMetaProductCategoryEditError(null));
        setCompleted(true);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  function unPublishCategory(docId: string) {
    metaProductCategoryRepo
      .updateOne({ status: 'unpublished' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductCategoryEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductCategory(res));
          dispatch(setMetaProductCategoryEditError(null));
        }
      });
  }

  function publishCategory(docId: string) {
    metaProductCategoryRepo
      .updateOne({ status: 'published' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductCategoryEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductCategory(res));
          dispatch(setMetaProductCategoryEditError(null));
        }
      });
  }

  return {
    loadingFlag,
    updateCategoryName,
    unPublishCategory,
    publishCategory,
    completedSetter,
    completed,
  };
}
