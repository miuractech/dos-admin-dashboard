import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reorder, TApplicationErrorObject } from 'rxf';
import { batchCommitFamily } from '../hooks/family/helpers-family';
import { TMetaProductFamily } from '../types';

type TDnd = 'initialize' | 'continue' | 'default';

interface TState {
  metaProductFamilies: Array<TMetaProductFamily>;
  fetchError: TApplicationErrorObject | null;
  editError: TApplicationErrorObject | null;
  addError: TApplicationErrorObject | null;
  dndInit: TDnd;
  preserveFamiliesBeforeDnd: Array<TMetaProductFamily>;
}

const state: TState = {
  metaProductFamilies: [],
  fetchError: null,
  editError: null,
  addError: null,
  dndInit: 'default',
  preserveFamiliesBeforeDnd: [],
};

const metaProductFamilySlice = createSlice({
  name: 'metaProductFamily',
  initialState: state,
  reducers: {
    setMetaProductFamilies: (
      state: TState,
      action: PayloadAction<Array<TMetaProductFamily>>
    ) => {
      state.metaProductFamilies = action.payload;
    },
    setMetaProductFamilyFetchError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.fetchError = action.payload;
    },
    setEditedMetaProductFamily: (
      state: TState,
      action: PayloadAction<TMetaProductFamily>
    ) => {
      const find = state.metaProductFamilies.findIndex(
        (s) => s.id === action.payload.id
      );
      if (find !== -1) state.metaProductFamilies[find] = action.payload;
    },
    setMetaProductFamilyEditError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.editError = action.payload;
    },
    setAddedMetaProductFamily: (
      state: TState,
      action: PayloadAction<TMetaProductFamily>
    ) => {
      state.metaProductFamilies.push(action.payload);
    },
    setMetaProductFamilyAddError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.addError = action.payload;
    },
    setPreserveFamilyBeforeDnd: (state: TState) => {
      if (state.dndInit === 'default') {
        state.dndInit = 'initialize';
        state.preserveFamiliesBeforeDnd = state.metaProductFamilies;
      } else if (state.dndInit === 'initialize') state.dndInit = 'continue';
    },
    setReorderFamily: (
      state: TState,
      action: PayloadAction<{ source: number; destination: number }>
    ) => {
      const reordered = reorder(
        state.metaProductFamilies,
        action.payload.destination,
        action.payload.source
      );

      if (!('severity' in reordered)) {
        state.metaProductFamilies = reordered;
      }
    },
    setDndFamily: (state: TState, action: PayloadAction<TDnd>) => {
      state.dndInit = action.payload;
    },
    setRestoreBeforeDnd: (state: TState) => {
      state.metaProductFamilies = state.preserveFamiliesBeforeDnd;
      state.preserveFamiliesBeforeDnd = [];
      state.dndInit = 'default';
    },
  },
});

export const {
  setAddedMetaProductFamily,
  setEditedMetaProductFamily,
  setMetaProductFamilies,
  setMetaProductFamilyAddError,
  setMetaProductFamilyEditError,
  setMetaProductFamilyFetchError,
  setReorderFamily,
  setRestoreBeforeDnd,
  setDndFamily,
  setPreserveFamilyBeforeDnd,
} = metaProductFamilySlice.actions;
export default metaProductFamilySlice.reducer;
