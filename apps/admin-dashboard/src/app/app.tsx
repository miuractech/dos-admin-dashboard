import { Provider } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Main from '../components/main';
import { store } from '../store';
import useReorderFamily from '../Midl/meta-products/hooks/family/reorder-family';

export function App() {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
}

function Wrapper() {
  const { reorderFamily } = useReorderFamily(true);
  function handleDnd(result: DropResult) {
    if (result.destination !== undefined && result.source !== undefined) {
      if (result.destination.droppableId === 'product-family-droppable') {
        reorderFamily('Somnath', result.source.index, result.destination.index);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={(result) => handleDnd(result)}>
      <Main />
    </DragDropContext>
  );
}

export default App;
