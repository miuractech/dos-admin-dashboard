import { configureStore } from '@reduxjs/toolkit'
import UserReduser from "./auth"
import designerReducer from '../../../../libs/cmi/src/lib/features/custom_merch_interface(CMI)/store/designerSlice';
import ObjectReducer from '../../../../libs/cmi/src/lib/features/custom_merch_interface(CMI)/store/objects';

export const store = configureStore({
  reducer: {
    User: UserReduser,
    designer: designerReducer,
    objects: ObjectReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch