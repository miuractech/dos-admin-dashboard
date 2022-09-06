import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/auth/authSlice';
<<<<<<< HEAD
import storefrontreduser from "./storeFrontslice"
import alertsReduser from "./alertslice"
import productReduser from "./product"
import cartReduser from "./cartSlice"
import pincodeReduser from "./pincodeSlice"
import designerReducer from "../CMI/features/custom_merch_interface(CMI)/store/designerSlice"
import ObjectReducer from "../CMI/features/custom_merch_interface(CMI)/store/objects"
import myProfileReduser from "./myProfileSlice"

=======
import storefrontreduser from './storeFrontslice';
import alertsReduser from './alertslice';
import productReduser from './product';
import cartReduser from './cartSlice';
import pincodeReduser from './pincodeSlice';
import designerReducer from '../CMI/features/custom_merch_interface(CMI)/store/designerSlice';
import ObjectReducer from '../CMI/features/custom_merch_interface(CMI)/store/objects';
import wishlistReducer from './wishlist';
>>>>>>> 148c4c17dbc00a3644d5f797415061216911eddc
export const store = configureStore({
  reducer: {
    User: UserReducer,
    storeFront: storefrontreduser,
    alerts: alertsReduser,
    product: productReduser,
    cart: cartReduser,
    pincode: pincodeReduser,
    designer: designerReducer,
    objects: ObjectReducer,
<<<<<<< HEAD
    myProfile:myProfileReduser
=======
    wishlist: wishlistReducer,
>>>>>>> 148c4c17dbc00a3644d5f797415061216911eddc
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
