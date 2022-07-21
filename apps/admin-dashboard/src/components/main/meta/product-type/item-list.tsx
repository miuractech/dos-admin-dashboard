import { Droppable, Draggable } from 'react-beautiful-dnd';

import { productTypeRepo } from '../../../../Midl/meta-products/hooks/product-type/helpers';
import {
  setMetaProductTypeFetchError,
  setMetaProductTypes,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import { RootState } from '../../../../store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';
import metaStyles from '../styles/meta.module.scss';
import Item from './item';
import { PRODUCT_TYPE_DND_ID } from '../../../../utils/settings';
import { orderBy } from 'firebase/firestore';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TMetaProductType } from 'apps/admin-dashboard/src/Midl/meta-products/types';

const ListItems = ({productTypes}:{productTypes:TMetaProductType[]}) => {
  const dispatch = useDispatch();
  
  const fetchProductTypes = React.useCallback(async () => {
    const res = await productTypeRepo.getAll([orderBy("index")]);
    if (res instanceof ApplicationErrorHandler)
      dispatch(setMetaProductTypeFetchError(res.errorObject));
    else {
      dispatch(setMetaProductTypes(res));
      dispatch(setMetaProductTypeFetchError(null));
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  return (
    <Droppable droppableId={PRODUCT_TYPE_DND_ID}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={metaStyles['list']}
        >
          {productTypes.map((product: TMetaProductType) => (
            <Draggable
              key={product.id}
              draggableId={`draggable ${product.id}`}
              index={product.index}
            >
              {(provided, snapshot) => (
                <div  
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Item key={product.id} item={product} />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default ListItems;
