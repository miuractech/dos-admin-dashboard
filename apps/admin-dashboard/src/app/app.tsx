import { Provider } from 'react-redux';
import React from 'react';

// drag-and-drop context for the whole application
import DndWrapper from '../components/dnd';

// redux store import
import { store } from '../store';
import Main from '../components/main';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndWrapper>
        <Main />
      </DndWrapper>
    </Provider>
  );
};

export default App;
