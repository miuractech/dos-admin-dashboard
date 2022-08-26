import { Button, Card, Typography } from '@mui/material'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderSummary } from '../cart/OrderSummary'
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { addressType, setAddress, setHash, setOrderDetails, setOrderId, setSelectedAddress, setSelectedAddressfull } from '../../../store/cartSlice'
import { app, db } from '../../../configs/firebaseConfig'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { setcourierpartners, setDeliverydetails, setDeliveryMessage } from '../../../store/pincodeSlice'
import { setBackDrop } from '../../../store/alertslice'

const encoder = new TextEncoder();
async function sha512(str: string) {
    const buf = await crypto.subtle.digest("SHA-512", encoder.encode(str))
    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('')
}

export const OrderConfirmation = () => {
    const { orderId,hash,orderDetails,selectedAddressfull } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.User)
    const { courierpartners, ETD, days, message } = useSelector((state: RootState) => state.pincode)
    const functions = getFunctions(app, "asia-south1")
    connectFunctionsEmulator(functions, "localhost", 5001);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!orderId)return
        dispatch(setBackDrop(true))
        const unsub = onSnapshot(doc(db, "orders", orderId), doc => {
            const data = doc.data()
            if (data) {
                const result = data['address']
                if (result) {
                    dispatch(setOrderDetails(data))
                    // dispatch(setBackDrop(false))
                }
            }
        });
        return () => unsub()
    }, [])

    console.log(orderId);
    console.log(orderDetails);

    useEffect(() => {
        if (!orderDetails) {
            getOrderDetails()
        }
    }, [orderId])

    const getOrderDetails = async () => {
        if (!orderId)return
            dispatch(setBackDrop(true))
            const docRef = doc(db, "orders", orderId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data()
                dispatch(setOrderDetails(data))
                // dispatch(setBackDrop(false))
            }
    }


    useEffect(() => {
        const getSha = async () => {
            if (!orderDetails?.address)return
            dispatch(setBackDrop(true))
            console.log("hash", `gtKFFx|${orderId}|${orderDetails.total}|T-Shirt|${orderDetails.address.firstName}|${orderDetails.address.email}|||||||||||4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW`)
                const res = await sha512(`gtKFFx|${orderId}|${orderDetails.total}|T-Shirt|${orderDetails.address.firstName}|${orderDetails.address.email}|||||||||||4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW`)
            console.log(res);
            dispatch(setHash(res))
            dispatch(setBackDrop(false))
            }
            getSha();
    }, [dispatch, orderDetails, orderId])

    useEffect(() => {
        if (!courierpartners) return
        const id = courierpartners.data.recommended_courier_company_id
        if (!id) {
            dispatch(setDeliveryMessage("Currently out of stock in this area."))
        }
        const companies = courierpartners.data.available_courier_companies
        const recommendedcouriercompany = companies.find(com => com.courier_company_id === id)
        const result = {
            days: recommendedcouriercompany?.estimated_delivery_days,
            ETD: recommendedcouriercompany?.etd
        }
        dispatch(setDeliverydetails(result))
    }, [courierpartners])

    const getDeleveryDate = async() => {
        try {
            if (!selectedAddressfull) return
            const pincode = httpsCallable(functions, "pincode")
            const result = await (await pincode({ pincode: selectedAddressfull.pincode })).data as any
            if (result.status === 200) {
                dispatch(setcourierpartners(result))
                dispatch(setDeliveryMessage(null))
                // dispatch(setBackDrop(false))
            } else {
                dispatch(setDeliveryMessage("Currently out of stock in this area."))
                dispatch(setDeliverydetails(null))
                // dispatch(setBackDrop(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(setBackDrop(false))
        }
}
    useEffect(() => {
        if (selectedAddressfull) {
            getDeleveryDate()
        } 
    }, [selectedAddressfull, user])
    
    return (
            <div className='p-5 gap-5 md:grid grid-cols-3 md:mx-16'>
                <div className='col-span-2 space-y-5'>
                    <Card className='grid grid-cols-2 p-5'>
                        <Typography className="font-bold">Delivery address :</Typography>
                        {selectedAddressfull && <div>
                            <Typography>{selectedAddressfull.firstName} {selectedAddressfull.lastName}</Typography>
                            <Typography>{selectedAddressfull.address}, {selectedAddressfull.city}, {selectedAddressfull.pincode}, {selectedAddressfull.country}</Typography>
                            <Typography>Phone: {selectedAddressfull.phone}</Typography>
                        </div>}
                    </Card>
                    <Card className='grid grid-cols-2 p-5'>
                        <Typography className="font-bold">Delivery date :</Typography>
                        <div>
                            {message && <Typography className='text-red-600'>{message}</Typography>}
                            {ETD && days && <Typography className='text-green-600 font-bold'>Delivery by {ETD}, ({days}days)</Typography>}
                        </div>
                    </Card>
                </div>
                <div>
                    <Typography variant='h6' fontWeight={500}>Order Summary</Typography>
                    <OrderSummary />
                {orderDetails?.address &&  <form action='https://test.payu.in/_payment' method='post'>
                        <input type="hidden" name="key" value="gtKFFx" />
                        <input type="hidden" name="txnid" value={orderId ?? ""} />
                        <input type="hidden" name="productinfo" value="T-Shirt" />
                        <input type="hidden" name="amount" value={`${orderDetails?.total}`} />
                        <input type="hidden" name="email" value={orderDetails?.address.email} />
                        <input type="hidden" name="firstname" value={orderDetails?.address.firstName} />
                        <input type="hidden" name="lastname" value={orderDetails?.address.lastName} />
                        <input type="hidden" name="surl" value="https://asia-south1-dropoutstore-8979d.cloudfunctions.net/api/success" />
                        <input type="hidden" name="furl" value="https://asia-south1-dropoutstore-8979d.cloudfunctions.net/api/failure" />
                        <input type="hidden" name="phone" value={`${orderDetails?.address.phone}`} />
                        <input type="hidden" name="hash" value={hash ?? ''} />
                        <Button type='submit' variant='contained' fullWidth>Proceed to payment</Button>
                    </form>}
                </div>
            </div>
  )
}

export interface TimeStamp {
	seconds: number;
	nanoseconds: number;
}

export interface TimeStamp {
	seconds: number;
	nanoseconds: number;
}

export interface Addres {
	city: string;
	country: string;
	email: string;
	lastName: string;
	firstName: string;
	phone: number;
	address: string;
	timeStamp: TimeStamp;
	id: string;
	pincode: number;
}

export interface Item {
	id: string;
	resellerId: string;
	size: string;
	productID: string;
	count: number;
}

export interface OrderDetails {
	orderid: string;
	userId: string;
	timeStamp: TimeStamp;
	orderStatus: string;
	total: number;
	address: Addres;
	items: Item[];
}