import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

type productsType = {
    product: produstsType | null
    Family: FamilyObjectType[] | null
    Category: catogoryType[]|null
    subCategory: SubCatogoryType[]|null
}

const initialState: productsType = {
    product: null,
    Family: null,
    Category: null,
    subCategory:null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setFamily: (state, action) => {
            state.Family = action.payload
        },
        setCategory: (state, action) => {
            state.Category = action.payload
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload
        },
    },
})

export const { setProduct, setFamily, setCategory, setSubCategory } = productSlice.actions

export default productSlice.reducer


export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface FamilyObjectType {
    updatedAt: UpdatedAt;
    status: string;
    createdAt: CreatedAt;
    createdBy: string;
    updatedBy: string;
    id: string;
    name: string;
    index: number;
}

export interface UpdatedAt {
	seconds: number;
	nanoseconds: number;
}

export interface CreatedAt {
	seconds: number;
	nanoseconds: number;
}

export interface catogoryType {
	name: string;
	updatedBy: string;
	createdBy: string;
	status: string;
	familyId: string;
	index: number;
	updatedAt: UpdatedAt;
	createdAt: CreatedAt;
	id: string;
}

export interface CreatedAt {
	seconds: number;
	nanoseconds: number;
}

export interface UpdatedAt {
	seconds: number;
	nanoseconds: number;
}

export interface SubCatogoryType {
	createdAt: CreatedAt;
	updatedAt: UpdatedAt;
	index: number;
	id: string;
	name: string;
	updatedBy: string;
	createdBy: string;
	categoryId: string;
	status: string;
	familyId: string;
}