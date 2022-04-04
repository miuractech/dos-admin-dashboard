import {
  setPreserveCategoryBeforeDnd,
  setReorderCategory,
} from 'apps/admin-dashboard/src/Midl/meta-products/store/meta-product.category.slice';
import {
  setPreserveFamilyBeforeDnd,
  setReorderFamily,
} from 'apps/admin-dashboard/src/Midl/meta-products/store/meta-product.family.slice';
import {
  PRODUCT_CATEGORY_DND_ID,
  PRODUCT_FAMILY_DND_ID,
} from 'apps/admin-dashboard/src/utils/settings';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Main from '../main';

function DndWrapper() {
  const dispatch = useDispatch();

  function handleDnd(result: DropResult) {
    if (result.destination !== undefined) {
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
      }
    }
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDnd(result);
      }}
    >
      <Main />
    </DragDropContext>
  );
}

export default DndWrapper;
