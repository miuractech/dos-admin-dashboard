import { Provider } from 'react-redux';
import React from 'react';
import GlobalComponents from '../test/global-components';

import DndWrapper from '../components/dnd';

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
