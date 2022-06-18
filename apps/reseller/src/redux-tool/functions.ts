import { createSlice } from "@reduxjs/toolkit"
import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import { stat } from "fs"

type initialStateProps = {
    profileUrl: null | string,
    profileLoading: boolean
}

const initialState: initialStateProps = {
    profileUrl: null,
    profileLoading: true
}

export const conditionSlice = createSlice({
    name: 'storeFront',
    initialState,
    reducers: {
        setStoreInfo: (state, action) => {
            state.profileUrl = action.payload
            state.profileLoading = false
        }
    },
    extraReducers: {

    }
})

export const { setStoreInfo } = conditionSlice.actions

export default conditionSlice.reducer