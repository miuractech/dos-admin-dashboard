import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TApplicationErrorObject } from 'rxf-rewrite';
import { TMetaProductType } from '../types';

interface TState {
  metaProductTypes: Array<TMetaProductType>;
  fetchError: TApplicationErrorObject | null;
  editError: TApplicationErrorObject | null;
  addError: TApplicationErrorObject | null;
  selectedProductType: TMetaProductType | null;
}

const state: TState = {
  metaProductTypes: [],
  fetchError: null,
  editError: null,
  addError: null,
  selectedProductType: null,
};

const metaProductTypeSlice = createSlice({
  name: 'metaProductType',
  initialState: state,
  reducers: {
    setMetaProductTypes: (
      state: TState,
      action: PayloadAction<Array<TMetaProductType>>
    ) => {
      state.metaProductTypes = action.payload;
    },
    setMetaProductTypeFetchError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject>
    ) => {
      state.fetchError = action.payload;
    },
    setMetaProductTypeAddError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject>
    ) => {
      state.addError = action.payload;
    },
    setMetaProductTypeEditError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject>
    ) => {
      state.editError = action.payload;
    },
    setAddedMetaProductType: (
      state: TState,
      action: PayloadAction<TMetaProductType>
    ) => {
      state.metaProductTypes = [...state.metaProductTypes, action.payload];
    },
    setEditedMetaProductType: (
      state: TState,
      action: PayloadAction<TMetaProductType>
    ) => {
      const find = state.metaProductTypes.findIndex(
        (t) => t.id === action.payload.id
      );
      if (find !== -1) state.metaProductTypes[find] = action.payload;
    },
  },
});

export const {
  setMetaProductTypes,
  setMetaProductTypeFetchError,
  setMetaProductTypeAddError,
  setMetaProductTypeEditError,
  setEditedMetaProductType,
  setAddedMetaProductType,
} = metaProductTypeSlice.actions;
export default metaProductTypeSlice.reducer;
