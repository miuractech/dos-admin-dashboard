import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchCount } from './api';
// import { productSideType, productType, productVariantType } from '../components/selectProduct';
import { historyLength } from '../setting/center';

const initialRectangles: any[] = [
  // {
  //   x: 100,
  //   y: 100,
  //   width: 100,
  //   height: 100,
  //   fill: '#00ff00',
  //   id: 'rect1',
  //   type:'rect',
  //   strokeWidth:0,
  //   stroke:'#fff',
  //   cornerRadius:0
  // },
  // {
  //   x: 150,
  //   y: 150,
  //   width: 100,
  //   height: 100,
  //   fill: '#ff0000',
  //   id: 'rect2',
  //   type: 'rect',
  //   strokeWidth:0,
  //   stroke:'#fff',
  //   cornerRadius:0
  // },
];

export interface DesignerState {
  currentSide: 'left' | 'right' | 'top' | 'bottom' | 'front' | 'back';
  currentObjects: Array<any>;
  history: Array<Array<any>>;
  sides: any
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DesignerState = {
  currentSide: 'front',
  currentObjects: initialRectangles,
  history: [[]],
  sides: [[]],
  status: 'idle'
};

export const ObjectSlice = createSlice({
  name: 'objects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateObject: (state, action) => {
      state.currentObjects = action.payload;
    },
    addObject: (state, action) => {
      // state.history = addElementToQueue(state.history,state.currentObjects)
      state.currentObjects = [...state.currentObjects, action.payload];
    },
    //     decrement: (state) => {
    //       state.value -= 1;
    //     },
    //     incrementByAmount: (state, action: PayloadAction<number>) => {
    //       state.value += action.payload;
    //     },
    //   },
    //   extraReducers: (builder) => {
    //     builder
    //       .addCase(incrementAsync.pending, (state) => {
    //         state.status = 'loading';
    //       })
    //       .addCase(incrementAsync.fulfilled, (state, action) => {
    //         state.status = 'idle';
    //         state.value += action.payload;
    //       });
  },
});

export const { updateObject, addObject } = ObjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectObject = (state: RootState) => state.objects;

export default ObjectSlice.reducer;


