import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../features/auth/authSlice';
import storefrontreduser from "./storeFrontslice"
import alertsReduser from "./alertslice"
import productReduser from "./product"
import cartReduser from "./cartSlice"

export const store = configureStore({
  reducer: {
    User: UserReducer,
    storeFront: storefrontreduser,
    alerts: alertsReduser,
    product: productReduser,
    cart: cartReduser
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch