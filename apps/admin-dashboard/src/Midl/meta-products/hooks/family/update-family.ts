import { firestore } from 'apps/admin-dashboard/src/config/firebase.config';
import { runTransaction } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationError } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import {
  setEditedMetaProductFamily,
  setMetaProductFamilyEditError,
} from '../../store/meta-product.family.slice';
import { metaProductFamilyRepo } from './helpers-family';

async function updateFamilyNameAsyncWrapper(
  payload: { name: string; updatedBy: string },
  docId: string
) {
  const res = await runTransaction(firestore, async () => {
    const docs = await metaProductFamilyRepo.getAll([]);
    if (docs instanceof ApplicationErrorHandler) return docs;
    else if (docs.filter((d) => d.name === payload.name).length === 0) {
      return metaProductFamilyRepo.updateOne(
        { name: payload.name, updatedBy: payload.updatedBy },
        docId
      );
    } else {
      return new ApplicationError().handleCustomError(
        'Conflict',
        'Naming Conflict/Limit',
        'Naming Conflicts or Limit of Documents has Exceeded',
        'error'
      );
    }
  });
  return res;
}

export default function useUpdateFamily(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const dispatch = useDispatch();

  function completedSetter(val: boolean) {
    setCompleted(val);
  }

  function updateFamilyName(
    payload: { name: string; updatedBy: string },
    docId: string
  ) {
    setLoadingFlag(true);
    setCompleted(false);
    const obs$ = from(updateFamilyNameAsyncWrapper(payload, docId));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductFamilyEditError(res.errorObject));
      else {
        dispatch(setEditedMetaProductFamily(res));
        dispatch(setMetaProductFamilyEditError(null));
        setCompleted(true);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  function unPublishFamily(docId: string) {
    metaProductFamilyRepo
      .updateOne({ status: 'unpublished' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductFamilyEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductFamily(res));
          dispatch(setMetaProductFamilyEditError(null));
        }
      });
  }

  function publishFamily(docId: string) {
    metaProductFamilyRepo
      .updateOne({ status: 'published' }, docId)
      .then((res) => {
        if (res instanceof ApplicationErrorHandler)
          dispatch(setMetaProductFamilyEditError(res.errorObject));
        else {
          dispatch(setEditedMetaProductFamily(res));
          dispatch(setMetaProductFamilyEditError(null));
        }
      });
  }

  return {
    loadingFlag,
    updateFamilyName,
    completed,
    completedSetter,
    publishFamily,
    unPublishFamily,
  };
}
