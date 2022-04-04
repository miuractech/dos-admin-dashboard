import { where } from 'firebase/firestore';
import React from 'react';
import { ApplicationError, TApplicationErrorObject } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { TMetaProductSubCategory } from '../../types';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

async function subcategoryByNameAsyncWrapper(name: string) {
  const res = await metaProductSubCategoryRepo.getAll([
    where('name', '==', name),
  ]);
  if (res instanceof ApplicationErrorHandler) return res;
  else {
    if (res.length === 1) return res[0];
    else return new ApplicationError().handleDocumentNotFound();
  }
}

export default function useGetSubCategoryByName(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [subcategory, setSubCategory] =
    React.useState<null | TMetaProductSubCategory>(null);
  const [subcategoryError, setSubCategoryError] =
    React.useState<null | TApplicationErrorObject>(null);

  function getSubCategoryByName(name: string) {
    setLoadingFlag(true);
    const obs$ = from(subcategoryByNameAsyncWrapper(name));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler)
        setSubCategoryError(res.errorObject);
      else {
        setSubCategory(res);
        setSubCategoryError(null);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getSubCategoryByName, subcategory, subcategoryError };
}
