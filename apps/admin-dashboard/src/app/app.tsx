import { Provider } from 'react-redux';
import DndWrapper from '../components/dnd';

import { store } from '../store';
import FormTest from './form-test';

export function App() {
  return (
    <Provider store={store}>
      <DndWrapper />
      {/* <FormTest /> */}
    </Provider>
  );
}

export default App;
