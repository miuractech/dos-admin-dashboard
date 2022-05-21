import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';


export interface DesignerState {
  base: string;
  path: string;
}

const initialState: DesignerState = {
  base: '',
  path: '',
};

export const ObjectSlice = createSlice({
  name: 'topbar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action) => {
      state.base = action.payload.base;
      state.path = action.payload.path;
    },

  },
});

export const { update } = ObjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectObject = (state: RootState) => state.topbar;

export default ObjectSlice.reducer;


