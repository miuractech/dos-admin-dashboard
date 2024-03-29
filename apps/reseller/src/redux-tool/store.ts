import { configureStore } from '@reduxjs/toolkit'
import UserReduser from "./auth"
import designerReducer from '../app/DesignProduct/features/custom_merch_interface(CMI)/store/designerSlice'
import ObjectReducer from '../app/DesignProduct/features/custom_merch_interface(CMI)/store/objects';
import conditionSlice from './functions';
import ListingsSlice from "./products"
import OrdersReduser from "./orderSlice"

export const store = configureStore({
  reducer: {
    User: UserReduser,
    designer: designerReducer,
    objects: ObjectReducer,
    condition: conditionSlice,
    listings: ListingsSlice,
    orders : OrdersReduser,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch