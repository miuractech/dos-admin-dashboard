import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { runTransaction, where } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationError } from 'rxf-rewrite/dist';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { MetaProductCategoryLimit } from '../../settings';
import {
  setAddedMetaProductCategory,
  setMetaProductCategoryAddError,
} from '../../store/meta-product.category.slice';
import { TMetaProductCategory } from '../../types';
import { metaProductCategoryRepo } from './helpers-category';

async function addNewCategoryAsyncWrapper(
  payload: { name: string; createdBy: string; familyId: string },
  docId: string
) {
  const res = await runTransaction(firestore, async () => {
    const docs = await metaProductCategoryRepo.getAll([
      where('familyId', '==', payload.familyId),
    ]);

    if (docs instanceof ApplicationErrorHandler) return docs;
    else if (
      docs.length < MetaProductCategoryLimit &&
      docs.filter((d) => d.name === payload.name).length === 0
    ) {
      const writeable: TMetaProductCategory = {
        id: docId,
        index: docs.length,
        name: payload.name,
        createdBy: payload.createdBy,
        updatedBy: payload.createdBy,
        familyId: payload.familyId,
        status: 'published',
      };
      return metaProductCategoryRepo.createOne(writeable, docId);
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

export default function useAddCategory(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const dispatch = useDispatch();

  function completedSetter(val: boolean) {
    setCompleted(val);
  }

  function addNewCategory(
    payload: { name: string; createdBy: string; familyId: string },
    docId: string
  ) {
    setLoadingFlag(true);
    setCompleted(false);
    const obs$ = from(addNewCategoryAsyncWrapper(payload, docId));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductCategoryAddError(res.errorObject));
      else {
        dispatch(setAddedMetaProductCategory(res));
        dispatch(setMetaProductCategoryAddError(null));
        setCompleted(true);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, addNewCategory, completed, completedSetter };
}
