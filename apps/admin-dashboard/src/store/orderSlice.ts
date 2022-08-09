import { createSlice } from '@reduxjs/toolkit'

type orderType = {
    orders: OrderDetailsType[]
}

const initialState: orderType = {
    orders:[]
}

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrderDetails: (state, action) => {
            state.orders = action.payload
        }
    },
})

export const { setOrderDetails } = OrderSlice.actions

export default OrderSlice.reducer

export interface Item {
	id: string;
	img: string;
	productID: string;
	size: string;
	count: number;
	resellerId: string;
	productName: string;
	price:string
}

export interface TimeStamp {
	seconds: number;
	nanoseconds: number;
}

export interface Addres {
	email: string;
	pincode: number;
	city: string;
	timeStamp: TimeStamp;
	address: string;
	id: string;
	phone: number;
	lastName: string;
	country: string;
	firstName: string;
}

export interface TimeStamp {
	seconds: number;
	nanoseconds: number;
}

export interface OrderDetailsType {
	orderid: string;
	items: Item[];
	address: Addres;
	userId: string;
	mode: string;
	addressId: string;
	paid: string;
	total: number;
	orderStatus: string;
	timeStamp: TimeStamp;
	status: string;
	disabled: boolean;
}