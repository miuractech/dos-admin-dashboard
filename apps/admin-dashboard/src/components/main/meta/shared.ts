import React from 'react';
import { BehaviorSubject } from 'rxjs';
import ProductType from './product-type';
import ProductCategory from './product-category';
import ProductFamily from './product-family';
import ProductSubCategory from './product-sub-category';

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
    mainComponent: ProductCategory,
  },
  SUB_CATEGORIES: {
    value: 'Sub Categories',
    mainComponent: ProductSubCategory,
  },
  PRODUCT_TYPE: {
    value: 'Product Type',
    mainComponent: ProductType,
  },
};

// Selected Meta Option
export const selectedMetaOption$ = new BehaviorSubject('PRODUCT_FAMILY');
