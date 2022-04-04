import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { runTransaction, where } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationError } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';
import {
  setEditedMetaProductSubCategory,
  setMetaProductSubCategoryEditError,
} from '../../store/meta-product.subcategory.slice';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

async function updateSubCategoryNameAsyncWrapper(
  payload: {
    name: string;
    updatedBy: string;
    familyId: string;
    categoryId: string;
  },
  docId: string
) {
  const res = await runTransaction(firestore, async () => {
    const docs = await metaProductSubCategoryRepo.getAll([
      where('familyId', '==', payload.familyId),
      where('categoryId', '==', payload.categoryId),
    ]);

    if (docs instanceof ApplicationErrorHandler) return docs;
    else if (docs.filter((d) => d.name === payload.name).length === 0) {
      return metaProductSubCategoryRepo.updateOne(payload, docId);
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

export default function useUpdateSubCategory(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const dispatch = useDispatch();

  function completedSetter(val: boolean) {
    setCompleted(val);
  }

  function updateSubCategoryName(
    payload: {
      name: string;
      updatedBy: string;
      familyId: string;
      categoryId: string;
    },
    docId: string
  ) {
    setLoadingFlag(true);
    setCompleted(false);
    const obs$ = from(updateSubCategoryNameAsyncWrapper(payload, docId));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductSubCategoryEditError(res.errorObject));
      else {
        dispatch(setEditedMetaProductSubCategory(res));
        dispatch(setMetaProductSubCategoryEditError(null));
        setCompleted(true);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  function unPublishSubCategory(docId: string) {
    metaProductSubCategoryRepo
      .updateOne({ status: 'unpublished' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductSubCategoryEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductSubCategory(res));
          dispatch(setMetaProductSubCategoryEditError(null));
        }
      });
  }

  function publishSubCategory(docId: string) {
    metaProductSubCategoryRepo
      .updateOne({ status: 'published' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductSubCategoryEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductSubCategory(res));
          dispatch(setMetaProductSubCategoryEditError(null));
        }
      });
  }

  return {
    loadingFlag,
    updateSubCategoryName,
    completed,
    completedSetter,
    publishSubCategory,
    unPublishSubCategory,
  };
}
