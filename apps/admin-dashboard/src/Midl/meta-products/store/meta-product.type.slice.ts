import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApplicationErrorHandler,
  reorder,
  TApplicationErrorObject,
} from 'rxf-rewrite/dist';
import { TMetaProductType } from '../types';

type TDnd = 'initialize' | 'continue' | 'default';

interface TState {
  metaProductTypes: Array<TMetaProductType>;
  fetchError: TApplicationErrorObject | null;
  editError: TApplicationErrorObject | null;
  addError: TApplicationErrorObject | null;
  selectedProductType: TMetaProductType | null;
  dndInit: TDnd;
  preserve: Array<TMetaProductType>;
}

const state: TState = {
  metaProductTypes: [],
  fetchError: null,
  editError: null,
  addError: null,
  selectedProductType: null,
  preserve: [],
  dndInit: 'default',
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
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.fetchError = action.payload;
    },
    setMetaProductTypeAddError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.addError = action.payload;
    },
    setMetaProductTypeEditError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
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
    setPreserveType: (state: TState) => {
      if (state.dndInit === 'default') {
        state.dndInit = 'initialize';
        state.preserve = state.metaProductTypes;
      } else if (state.dndInit === 'initialize') {
        state.dndInit = 'continue';
      }
    },
    setReorderType: (
      state: TState,
      action: PayloadAction<{ source: number; destination: number }>
    ) => {
      const reordered = reorder(
        state.metaProductTypes,
        action.payload.destination,
        action.payload.source
      );

      if (!(reordered instanceof ApplicationErrorHandler)) {
        state.metaProductTypes = reordered;
      }
    },
    setDndType: (state: TState, action: PayloadAction<TDnd>) => {
      state.dndInit = action.payload;
    },
    setRestoreBeforeDnd: (state: TState) => {
      state.metaProductTypes = state.preserve;
      state.preserve = [];
      state.dndInit = 'default';
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
  setPreserveType,
  setDndType,
  setReorderType,
  setRestoreBeforeDnd
} = metaProductTypeSlice.actions;
export default metaProductTypeSlice.reducer;
