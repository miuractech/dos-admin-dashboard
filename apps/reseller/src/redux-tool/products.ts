import { createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
    queriedListings: ProductsObject[] | null
}

const initialState: initialStateProps = {
    queriedListings: null,
}

export const ListingsSlice = createSlice({
    name: 'Listings',
    initialState,
    reducers: {
        setQueriedListings: (state, action) => {
            state.queriedListings = action.payload
        }
    }
})

export const { setQueriedListings } = ListingsSlice.actions

export default ListingsSlice.reducer

export interface SideImage {
    sideName: string;
    url: string;
}

export interface Sku {
    s: string;
    l: string;
    m: string;
    Xs: string;
}

export interface ProductsObject {
    data(): any
    subCategoryId: string;
    sizeAvailable: string[];
    price: number;
    comparePrice: number;
    productId: string;
    sideImages: SideImage[];
    sku: Sku;
    basePrice: number;
    resellerId: string;
    productName: string;
    resellerDescription: string;
    color: string;
    categoryId: string;
    familyId: string;
    status: string
}