import { getFirestore, runTransaction, where } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationError } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { MetaProductSubCategoryLimit } from '../../settings';
import {
  setAddedMetaProductSubCategory,
  setMetaProductSubCategoryAddError,
} from '../../store/meta-product.subcategory.slice';
import { TMetaProductSubCategory } from '../../types';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

async function addNewSubCategoryAsyncWrapper(
  payload: {
    name: string;
    createdBy: string;
    familyId: string;
    categoryId: string;
  },
  docId: string
) {
  const res = await runTransaction(getFirestore(), async () => {
    const docs = await metaProductSubCategoryRepo.getAll([
      where('familyId', '==', payload.familyId),
      where('categoryId', '==', payload.categoryId),
    ]);

    if (docs instanceof ApplicationErrorHandler) return docs;
    else if (
      docs.length < MetaProductSubCategoryLimit &&
      docs.filter((d) => d.name === payload.name).length === 0
    ) {
      const writeable: TMetaProductSubCategory = {
        id: docId,
        index: docs.length,
        name: payload.name,
        createdBy: payload.createdBy,
        updatedBy: payload.createdBy,
        familyId: payload.familyId,
        categoryId: payload.categoryId,
        status: 'published',
      };
      return metaProductSubCategoryRepo.createOne(writeable, docId);
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

export default function useAddSubCategory(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const dispatch = useDispatch();

  function completedSetter(val: boolean) {
    setCompleted(val);
  }

  function addNewSubCategory(
    payload: {
      name: string;
      createdBy: string;
      familyId: string;
      categoryId: string;
    },
    docId: string
  ) {
    setLoadingFlag(true);
    setCompleted(false);
    const obs$ = from(addNewSubCategoryAsyncWrapper(payload, docId));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductSubCategoryAddError(res.errorObject));
      else {
        dispatch(setAddedMetaProductSubCategory(res));
        dispatch(setMetaProductSubCategoryAddError(null));
        setCompleted(true);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, addNewSubCategory, completed, completedSetter };
}
