import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { Categories, ProductType, SubCategories } from './mock';
import ProductFamily from './product-family';

export const metaTopbarObject: {
  [key: string]: {
    value: string;
    mainComponent: React.FC;
  };
} = {
  PRODUCT_FAMILY: {
    value: 'Product Family',
    mainComponent: ProductFamily,
  },
  CATEGORIES: {
    value: 'Categories',
    mainComponent: Categories,
  },
  SUB_CATEGORIES: {
    value: 'Sub Categories',
    mainComponent: SubCategories,
  },
  PRODUCT_TYPE: {
    value: 'Product Type',
    mainComponent: ProductType,
  },
};

// Selected Meta Option
export const selectedMetaOption$ = new BehaviorSubject('PRODUCT_FAMILY');
