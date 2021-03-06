import React from 'react';
import { TApplicationErrorObject } from 'rxf-rewrite';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { TMetaProductSubCategory } from '../../types';
import { metaProductSubCategoryRepo } from './helpers-subcategory';

export default function useGetSubCategoryById(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [subCategory, setSubCategory] =
    React.useState<null | TMetaProductSubCategory>(null);
  const [subCategoryError, setSubCategoryError] =
    React.useState<null | TApplicationErrorObject>(null);

  function getSubCategoryById(id: string) {
    setLoadingFlag(true);
    const obs$ = from(metaProductSubCategoryRepo.getOne(id));
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

  return { subCategory, subCategoryError, loadingFlag, getSubCategoryById };
}
