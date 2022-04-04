import { where } from 'firebase/firestore';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import DndWrapper from '../components/dnd';
import useGetSubCategories from '../Midl/meta-products/hooks/sub-category/get-subcategories';

import { RootState, store } from '../store';
import FormTest from './form-test';

export function App() {
  return (
    <Provider store={store}>
      <FormTest />
    </Provider>
  );
}

export default App;
