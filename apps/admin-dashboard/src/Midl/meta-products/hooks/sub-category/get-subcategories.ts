import { QueryConstraint } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { from } from 'rxjs';

import { setMetaProductCategoryFetchError } from '../../store/meta-product.category.slice';
import {
  setMetaProductSubCategories,
  setMetaProductSubCategoryFetchError,
} from '../../store/meta-product.subcategory.slice';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

export default function useGetSubCategories(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const dispatch = useDispatch();

  function getSubCategories(constraints: Array<QueryConstraint>) {
    setLoadingFlag(true);
    const obs$ = from(metaProductSubCategoryRepo.getAll([...constraints]));
    const sub = obs$.subscribe((res) => {
      if ('severity' in res) dispatch(setMetaProductSubCategoryFetchError(res));
      else {
        dispatch(setMetaProductSubCategories(res));
        dispatch(setMetaProductCategoryFetchError(null));
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getSubCategories };
}
