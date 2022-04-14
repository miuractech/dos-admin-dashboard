import { productTypeRepo } from '../../../../Midl/meta-products/hooks/product-type/helpers';
import {
  setMetaProductTypeFetchError,
  setMetaProductTypes,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import { RootState } from 'apps/admin-dashboard/src/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';
import metaStyles from '../styles/meta.module.scss';
import Item from './item';

const ListItems: React.FC = () => {
  const dispatch = useDispatch();
  const productTypes = useSelector(
    (state: RootState) => state.metaProductType.metaProductTypes
  );
  const fetchProductTypes = React.useCallback(async () => {
    const res = await productTypeRepo.getAll([]);
    if (res instanceof ApplicationErrorHandler)
      dispatch(setMetaProductTypeFetchError(res.errorObject));
    else {
      dispatch(setMetaProductTypes(res));
      dispatch(setMetaProductTypeFetchError(null));
    }
  }, []);

  React.useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  return (
    <div className={metaStyles['list']}>
      {productTypes.map((product) => (
        <Item key={product.id} item={product} />
      ))}
    </div>
  );
};

export default ListItems;
