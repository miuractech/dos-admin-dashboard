import {
  setPreserveCategoryBeforeDnd,
  setReorderCategory,
} from '../../Midl/meta-products/store/meta-product.category.slice';
import {
  setPreserveFamilyBeforeDnd,
  setReorderFamily,
} from '../../Midl/meta-products/store/meta-product.family.slice';
import {
  PRODUCT_CATEGORY_DND_ID,
  PRODUCT_FAMILY_DND_ID,
  PRODUCT_TYPE_DND_ID,
} from '../../utils/settings';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import React from 'react';
import {
  setPreserveType,
  setReorderType,
} from '../../Midl/meta-products/store/meta-product.type.slice';

const DndWrapper: React.FC = (props) => {
  const dispatch = useDispatch();

  function handleDnd(result: DropResult) {
    if (result.destination !== undefined && result.destination !== null) {
      if (
        result.source.droppableId === PRODUCT_FAMILY_DND_ID &&
        result.destination.droppableId === PRODUCT_FAMILY_DND_ID
      ) {
        dispatch(setPreserveFamilyBeforeDnd());
        dispatch(
          setReorderFamily({
            source: result.source.index,
            destination: result.destination.index,
          })
        );
      } else if (
        result.source.droppableId === PRODUCT_CATEGORY_DND_ID &&
        result.destination.droppableId === PRODUCT_CATEGORY_DND_ID
      ) {
        dispatch(setPreserveCategoryBeforeDnd());
        dispatch(
          setReorderCategory({
            source: result.source.index,
            destination: result.destination.index,
          })
        );
      } else if (
        result.source.droppableId === PRODUCT_TYPE_DND_ID &&
        result.destination.droppableId === PRODUCT_TYPE_DND_ID
      ) {
        dispatch(setPreserveType());
        dispatch(
          setReorderType({
            source: result.source.index,
            destination: result.destination.index,
          })
        );
      }
    }
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDnd(result);
      }}
    >
      {props.children}
    </DragDropContext>
  );
};

export default DndWrapper;
