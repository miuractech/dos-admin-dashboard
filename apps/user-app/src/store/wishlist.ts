import { createSlice } from '@reduxjs/toolkit';
interface WishlistObject {
  productid: string | undefined;
  resellerid: string | undefined;
}
type initialStateType = { wishlist: WishlistObject[] };

const initialState: initialStateType = {
  wishlist: [
    {
      productid: 'tring | undefined',
      resellerid: ' string | undefined;',
    },
  ],
};
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const obj = action.payload;
      state.wishlist.push(obj);
    },
    removeWishlist: (state, action) => {
      const { productId, reSellerId } = action.payload;
      state.wishlist = state.wishlist.filter(
        (item) =>
          !(item.resellerid === reSellerId && item.productid === productId)
      );
    },
    setLocalWishlistData: (state, action) => {
      console.log(action.payload);
      state.wishlist = action.payload;
      console.log(state);
    },
  },
});
export const { removeWishlist, setLocalWishlistData, addWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
