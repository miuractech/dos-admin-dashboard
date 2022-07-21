import { createSlice } from '@reduxjs/toolkit'

type storeFrontSlice = {
    storeFrontDetails: storeFrontDetailsType | null
    productsList: produstsType[] | null
}

const initialState: storeFrontSlice = {
    storeFrontDetails: null,
    productsList: null
}

export const storeFrontSlice = createSlice({
    name: 'storeFront',
    initialState,
    reducers: {
        setStoreFrontDetails: (state, action) => {
            state.storeFrontDetails = action.payload
        },
        setSellerProductsList: (state, action) => {
            state.productsList = action.payload
        }

    },
})

export const { setStoreFrontDetails, setSellerProductsList } = storeFrontSlice.actions

export default storeFrontSlice.reducer


export interface SelectedTemplate {
    display: string;
    alignContent: string;
    borderRadius: string;
    aspectX: number;
    height: number;
    aspectY: number;
    mobileHeight: number;
    gridRow: string;
    gridColumn: string;
    gridRowMobile?: string;
    gridColumnMobile?: string;
    img: string;
    backgroundColor: string;
    justifyContent: string;
    mobileWidth: number;
    width: number;
}

export interface storeFrontDetailsType {
    bannerUrl: string;
    selectedTemplate: SelectedTemplate[];
    storeName: string;
    email: string;
    fullName: string;
    phone: string;
    profileUrl: string;
}

export interface SideImageType {
    sideName: string;
    url: string;
}

export interface Sku {
    xs: string;
    m: string;
    l: string;
    s: string;
}

export interface produstsType {
    status: string;
    sideImages: SideImageType[];
    resellerDescription: string;
    description: string;
    subCategoryId: string;
    comparePrice: number;
    sku: Sku;
    productName: string;
    productId: string;
    price: number;
    color: string;
    familyId: string;
    categoryId: string;
    basePrice: number;
    sizeAvailable: string[];
    resellerId: string;
}