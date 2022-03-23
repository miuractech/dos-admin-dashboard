import { Provider, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Main from '../components/main';
import { store } from '../store';
import {
  PRODUCT_CATEGORY_DND_ID,
  PRODUCT_FAMILY_DND_ID,
} from '../utils/settings';
import {
  setPreserveFamilyBeforeDnd,
  setReorderFamily,
} from '../Midl/meta-products/store/meta-product.family.slice';
import {
  setPreserveCategoryBeforeDnd,
  setReorderCategory,
} from '../Midl/meta-products/store/meta-product.category.slice';

export function App() {
  return (
    <Provider store={store}>
      <DndWrapper />
    </Provider>
  );
}

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

export default App;
