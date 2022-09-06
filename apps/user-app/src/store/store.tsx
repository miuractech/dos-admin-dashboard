import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../features/auth/authSlice';
import storefrontreduser from "./storeFrontslice"
import alertsReduser from "./alertslice"
import productReduser from "./product"
import cartReduser from "./cartSlice"
import pincodeReduser from "./pincodeSlice"
import designerReducer from "../CMI/features/custom_merch_interface(CMI)/store/designerSlice"
import ObjectReducer from "../CMI/features/custom_merch_interface(CMI)/store/objects"
import myProfileReduser from "./myProfileSlice"

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
    myProfile:myProfileReduser
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
