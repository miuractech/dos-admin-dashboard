import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchCount } from './api';
import { RootObject } from '../components/selectProduct';
// import { productSideType, productType, productVariantType } from '../components/selectProduct';

export interface DesignerState {
  products: RootObject[] | null;
  product: RootObject | null

}

const initialState: DesignerState = {
  // bgImage: null,
  // product: null,
  // status: 'idle',
  // productVariant: null,
  // productSide: null
  products: null,
  product: null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const DesignerSlice = createSlice({
  name: 'designer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBgImage: (state, action) => {
      // state.bgImage = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      // state.productVariant = action.payload.variants[0]
      // state.productSide = action.payload.variants[0].sides[0]
      // state.bgImage = action.payload.variants[0].sides[0].img
    },
    setProduct: (state, action) => {
      state.product = action.payload;
      // state.productVariant = action.payload.variants[0]
      // state.productSide = action.payload.variants[0].sides[0]
      // state.bgImage = action.payload.variants[0].sides[0].img
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

export const { setBgImage, setProduct, setProducts } = DesignerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDesigner = (state: RootState) => state.designer;

export default DesignerSlice.reducer;
