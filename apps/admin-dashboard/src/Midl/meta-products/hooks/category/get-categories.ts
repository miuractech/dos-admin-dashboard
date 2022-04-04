import { QueryConstraint } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import {
  setMetaProductCategories,
  setMetaProductCategoryFetchError,
} from '../../store/meta-product.category.slice';
import { metaProductCategoryRepo } from './helpers-category';

export default function useGetCategories(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const dispatch = useDispatch();

  function getCategories(constraints: Array<QueryConstraint>) {
    setLoadingFlag(true);
    const obs$ = from(metaProductCategoryRepo.getAll([...constraints]));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        dispatch(setMetaProductCategoryFetchError(res.errorObject));
      else {
        dispatch(setMetaProductCategories(res));
        dispatch(setMetaProductCategoryFetchError(null));
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getCategories };
}
