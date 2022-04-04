import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { TMetaProductCategory } from '../types';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { TApplicationErrorObject } from 'rxf-rewrite/dist/types/application-error';
import reorder from 'rxf-rewrite/dist/helpers/reorder';

type TDnd = 'initialize' | 'continue' | 'default';

interface TState {
  metaProductCategories: Array<TMetaProductCategory>;
  metaProductCategoriesByFamily: Array<TMetaProductCategory>;
  fetchError: TApplicationErrorObject | null;
  editError: TApplicationErrorObject | null;
  addError: TApplicationErrorObject | null;
  dndInit: TDnd;
  preserveCategoriesBeforeDnd: Array<TMetaProductCategory>;
}

const state: TState = {
  metaProductCategories: [],
  metaProductCategoriesByFamily: [],
  fetchError: null,
  editError: null,
  addError: null,
  dndInit: 'default',
  preserveCategoriesBeforeDnd: [],
};

export const metaProductCategorySlice = createSlice({
  name: 'metaProductCategory',
  initialState: state,
  reducers: {
    setMetaProductCategories: (
      state: TState,
      action: PayloadAction<Array<TMetaProductCategory>>
    ) => {
      state.metaProductCategories = action.payload;
    },
    setMetaProductCategoriesByFamily: (
      state: TState,
      action: PayloadAction<Array<TMetaProductCategory>>
    ) => {
      state.metaProductCategoriesByFamily = action.payload;
    },
    setMetaProductCategoriesAfterReorder: (state: TState) => {
      state.metaProductCategories.forEach((c) => {
        const filtered = state.metaProductCategoriesByFamily.filter(
          (m) => m.id === c.id
        );
        if (filtered.length === 1) {
          c.index = filtered[0].index;
        }
      });
      return state;
    },
    setMetaProductCategoryFetchError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.fetchError = action.payload;
    },
    setEditedMetaProductCategory: (
      state: TState,
      action: PayloadAction<TMetaProductCategory>
    ) => {
      const find = state.metaProductCategories.findIndex(
        (s) => s.id === action.payload.id
      );
      if (find !== -1) state.metaProductCategories[find] = action.payload;
    },
    setMetaProductCategoryEditError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.editError = action.payload;
    },
    setAddedMetaProductCategory: (
      state: TState,
      action: PayloadAction<TMetaProductCategory>
    ) => {
      state.metaProductCategories.push(action.payload);
    },
    setMetaProductCategoryAddError: (
      state: TState,
      action: PayloadAction<TApplicationErrorObject | null>
    ) => {
      state.addError = action.payload;
    },
    setPreserveCategoryBeforeDnd: (state: TState) => {
      if (state.dndInit === 'default') {
        state.dndInit = 'initialize';
        state.preserveCategoriesBeforeDnd = state.metaProductCategoriesByFamily;
      } else if (state.dndInit === 'initialize') state.dndInit = 'continue';
    },
    setReorderCategory: (
      state: TState,
      action: PayloadAction<{ source: number; destination: number }>
    ) => {
      const reordered = reorder(
        state.metaProductCategoriesByFamily,
        action.payload.destination,
        action.payload.source
      );
      if (!(reordered instanceof ApplicationErrorHandler)) {
        state.metaProductCategoriesByFamily = reordered;
      }
    },
    setDndCategory: (state: TState, action: PayloadAction<TDnd>) => {
      state.dndInit = action.payload;
    },
    setRestoreCategoryBeforeDnd: (state: TState) => {
      state.metaProductCategoriesByFamily = state.preserveCategoriesBeforeDnd;
      state.preserveCategoriesBeforeDnd = [];
      state.dndInit = 'default';
    },
  },
});

export const {
  setAddedMetaProductCategory,
  setEditedMetaProductCategory,
  setMetaProductCategories,
  setMetaProductCategoryAddError,
  setMetaProductCategoryEditError,
  setMetaProductCategoryFetchError,
  setMetaProductCategoriesByFamily,
  setReorderCategory,
  setPreserveCategoryBeforeDnd,
  setRestoreCategoryBeforeDnd,
  setDndCategory,
  setMetaProductCategoriesAfterReorder,
} = metaProductCategorySlice.actions;
export default metaProductCategorySlice.reducer;
