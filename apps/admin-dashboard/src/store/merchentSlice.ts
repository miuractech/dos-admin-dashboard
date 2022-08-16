import { createSlice } from '@reduxjs/toolkit'

type merchentType = {
    merchents: MerchentType[]
}

const initialState: merchentType = {
    merchents: []
}

export const merchentSlice = createSlice({
    name: 'merchents',
    initialState,
    reducers: {
        setMerchentDelatils: (state, action) => {
            state.merchents = action.payload
        }
    },
})

export const { setMerchentDelatils } = merchentSlice.actions

export default merchentSlice.reducer

export interface SelectedTemplate {
	height: number;
	aspectY: number;
	mobileWidth: number;
	gridRow: string;
	backgroundColor: string;
	gridColumnMobile: string;
	alignContent: string;
	img: string;
	gridColumn: string;
	display: string;
	width: number;
	justifyContent: string;
	gridRowMobile: string;
	aspectX: number;
	mobileHeight: number;
	borderRadius: string;
}

export interface MerchentType {
	selectedTemplate: SelectedTemplate[];
	bannerUrl: string;
	fullName: string;
	phone: string;
	email: string;
	storeName: string;
    profileUrl: string;
    id:string
}