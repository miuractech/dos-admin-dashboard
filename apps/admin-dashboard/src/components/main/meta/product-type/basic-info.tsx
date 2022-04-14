import { TMetaProductType } from 'apps/admin-dashboard/src/Midl/meta-products/types';
import React from 'react';

const BasicInfo: React.FC<{ item: TMetaProductType }> = ({ item }) => {
  return <h1>{item.name}</h1>;
};

export default BasicInfo;
