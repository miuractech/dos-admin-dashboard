import { Provider } from 'react-redux';
import DndWrapper from '../components/dnd';

import { store } from '../store';

export function App() {
  return <Provider store={store}>{/* <DndWrapper /> */}</Provider>;
}

export default App;
