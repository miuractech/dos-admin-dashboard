import { createSlice } from '@reduxjs/toolkit';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { RootState } from '../../../store/index';


export interface DesignerState {
    value: null | UseFormSetValue<FieldValues>
    update: string
    id: null | string
}

const initialState: DesignerState = {
    value: null,
    update: "modal",
    id: null
};

export const ObjectSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        value: (state, action) => {
            state.value = action.payload.value
        },
        update: (state, action) => {
            state.update = action.payload.update
        },
        id: (state, action) => {
            state.id = action.payload.id
        }
    }
});

export const { value, update, id } = ObjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectObject = (state: RootState) => state.topbar;

export default ObjectSlice.reducer;


