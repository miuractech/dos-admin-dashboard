import { getFirestore, runTransaction } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';
import {
  setEditedMetaProductFamily,
  setMetaProductFamilyEditError,
} from '../../store/meta-product.family.slice';
import { metaProductFamilyRepo } from './helpers-family';

async function deleteFamilyAsyncWrapper(docId: string, userName: string) {
  const res = await runTransaction(getFirestore(), async () => {
    const doc = await metaProductFamilyRepo.updateOne(
      { status: 'deleted' },
      docId
    );
    if (doc instanceof ApplicationErrorHandler) return doc;
    else {
      return await metaProductFamilyRepo.getOne(docId);
    }
  });
  return res;
}

export default function useDeleteFamily(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const dispatch = useDispatch();

  function deleteFamily(docId: string, userName: string) {
    setLoadingFlag(true);
    const obs$ = from(deleteFamilyAsyncWrapper(docId, userName));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductFamilyEditError(res.errorObject));
      else {
        dispatch(setEditedMetaProductFamily(res));
        dispatch(setMetaProductFamilyEditError(null));
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, deleteFamily };
}
