import { QueryConstraint } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import {
  setMetaProductFamilies,
  setMetaProductFamilyFetchError,
} from '../../store/meta-product.family.slice';
import { metaProductFamilyRepo } from './helpers-family';

export default function useGetFamilies(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const dispatch = useDispatch();

  function getFamilies(constraints: Array<QueryConstraint>) {
    setLoadingFlag(true);
    const obs$ = from(metaProductFamilyRepo.getAll([...constraints]));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductFamilyFetchError(res.errorObject));
      else {
        dispatch(setMetaProductFamilies(res));
        dispatch(setMetaProductFamilyFetchError(null));
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getFamilies };
}
