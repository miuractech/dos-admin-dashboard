import { createSlice } from '@reduxjs/toolkit';

type myProfileType = {
  whishListProducts: any[];
  myProfile: any
};

const initialState: myProfileType = {
  whishListProducts: [],
  myProfile: {},
};

export const myProfileSlice = createSlice({
  name: 'Myprofile',
  initialState,
  reducers: {
    addWishListProducts: (state, action) => {
      state.whishListProducts.push(action.payload);
    },
    addProfile: (state, action) => {
      state.myProfile = action.payload;
    },
  },
});

export const { addWishListProducts, addProfile } = myProfileSlice.actions;

export default myProfileSlice.reducer;
