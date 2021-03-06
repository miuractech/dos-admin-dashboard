import { where } from 'firebase/firestore';
import React from 'react';
import { ApplicationError, TApplicationErrorObject } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { TMetaProductCategory } from '../../types';
import { metaProductCategoryRepo } from './helpers-category';

async function categoryByNameAsyncWrapper(name: string) {
  const res = await metaProductCategoryRepo.getAll([where('name', '==', name)]);
  if (res instanceof ApplicationErrorHandler) return res;
  else {
    if (res.length === 1) return res[0];
    else return new ApplicationError().handleDocumentNotFound();
  }
}

export default function useGetCategoryByName(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [category, setCategory] = React.useState<null | TMetaProductCategory>(
    null
  );
  const [categoryError, setCategoryError] =
    React.useState<null | TApplicationErrorObject>(null);

  function getCategoryByName(name: string) {
    setLoadingFlag(true);
    const obs$ = from(categoryByNameAsyncWrapper(name));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        setCategoryError(res.errorObject);
      else {
        setCategory(res);
        setCategoryError(null);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getCategoryByName, category, categoryError };
}
