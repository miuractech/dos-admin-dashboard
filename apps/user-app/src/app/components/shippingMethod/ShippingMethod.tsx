import { Button, Card, Typography } from '@mui/material'
import InputField from '../../../UI/input-field/input-field'
import React, { useEffect, useState } from 'react'
import { OrderSummary } from '../cart/OrderSummary'
import SimpleModal from '@dropout-store/simple-modal'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { app, db } from '../../../configs/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { setError } from '../../../store/alertslice'
import { setBackDrop, setNotification } from '../../../store/alertslice'
import { addAddress, setAddress, addressType, addCartProducts, localCart, setSelectedAddressfull, setOrderId } from '../../../store/cartSlice'
import { AddressCard } from './AddressCard'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    firstName: yup.string().min(2).max(100).required("First Name is required"),
    lastName: yup.string().min(1).max(100).required("Last Name is required"),
    address: yup.string().min(10).max(1000).required("Address is required"),
    city: yup.string().min(2).max(1000).required("City is required"),
    country: yup.string().min(3).max(1000).required("Country is required"),
    pincode: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').required('Pincode is required'),
    phone: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000, 'enter valid phone number').max(9999999999, 'enter valid phone number').required('phone number is required'),
})

type Inputs = {
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    country: string,
    pincode: number,
    phone: number,
};

export const ShippingMethod = () => {
    const [open, setOpen] = useState(false)
    const { user } = useSelector((state: RootState) => state.User)
    const { addresses, selectedAddress, hash, orderId, orderDetails, selectedAddressfull } = useSelector((state: RootState) => state.cart)
    const { backDrop } = useSelector((state: RootState) => state.alerts)
    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm<Inputs>({ resolver: yupResolver(schema) })
    const [mode, setMode] = useState<"normal" | "edit">("normal")
    const [id, setId] = useState<null | string>(null)
    const [dataRecivied, setDataRecivied] = useState(false)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const functions = getFunctions(app, "asia-south1")
    connectFunctionsEmulator(functions, "localhost", 5001);
    const onSubmit = async (data: Inputs) => {
        if (mode === "edit") {
            try {
                if (!user||!id) return
                dispatch(setBackDrop(true))
                const ref = doc(db, "users", user.uid, "addresses", id)
                await updateDoc(ref, {
                    ...data,
                    timeStamp: serverTimestamp()
                })
                const copy = [...addresses]
                const index = copy.findIndex(a => a.id === id)
                const result = copy.splice(index, 1, {
                    ...data,
                    id: id
                })
                dispatch(addAddress(result))
                reset()
                dispatch(setBackDrop(false))
                setOpen(false)
                setMode("normal")
                dispatch(setNotification("Address added successfully"))
            } catch (error) {
                dispatch(setError("error updating address try once again"))
                console.log(error);
                dispatch(setBackDrop(false))
                setMode("normal")
            }
        } else {
            try {
                if (!user) return
                dispatch(setBackDrop(true))
                const ref = collection(db, "users", user.uid, "addresses",)
                await addDoc(ref, {
                    ...data,
                    timeStamp: serverTimestamp()
                });
                dispatch(addAddress({
                    ...data,
                    timeStamp: serverTimestamp()
                }))
                reset() 
                dispatch(setBackDrop(false))
                setOpen(false)
                dispatch(setNotification("Address added successfully"))
    
            } catch (error) {
                dispatch(setError("error adding address try once again"))
                dispatch(setBackDrop(false))
            }
        }
    }

    // useEffect(() => {
    //     cartProducts()
    // }, [])

    // const cartProducts = async () => {
    //     if(!user)return
    //     const docRef = doc(db, "cart", user.uid);
    //     const querySnapshot = await getDoc(docRef)
    //     if (querySnapshot.exists()) {
    //         const data = querySnapshot.data()['items']
    //         data.forEach(async (element: localCart) => {
    //             const docRef = doc(db, "reSellers", element.resellerId, "products", element.productID)
    //             const docSnap = await getDoc(docRef)
    //             dispatch(addCartProducts({
    //                 product: docSnap.data(),
    //                 size: element.size,
    //                 count: element.count,
    //                 id: element.id
    //             }))
    //         })
    //     }
    // }
    
    
    const deleteAddress = async(id:string) => {
        try {
            if (!user) return
            dispatch(setBackDrop(true))
            await deleteDoc(doc(db, "users", user.uid, "addresses", id));
            const addressesCopy = [...addresses]
            const result = addressesCopy.filter(a=>a.id!==id)
            dispatch(setAddress(result))
            dispatch(setBackDrop(false))
            dispatch(setNotification("Address deleted successfully"))
        } catch (error) {
            dispatch(setError("error deleting address try once again"))
            dispatch(setBackDrop(false))
        }
    }

    const editAddress = async (id: string) => {
        setMode("edit")
        setId(id)
        setOpen(true)
        const result = addresses.find((a: { id: string }) => a.id === id)
        if (!result)return
        setValue("firstName", result.firstName)
        setValue("lastName", result.lastName)
        setValue("email", result.email)
        setValue("country", result.country)
        setValue("phone", result.phone)
        setValue("pincode", result.pincode)
        setValue("address", result.address)
        setValue("city", result.city)
    }

    const updateAddressToDoc = async () => {
      try {
          if (!user) return
          if (selectedAddress) {
              const address = addresses.find(a => a.id === selectedAddress)
              if (!address) return
              const local = localStorage.getItem("cart")
              if (!local) return
              const data: localCart[] = JSON.parse(local)
              const ref = doc(db, "cart", user.uid)
              await updateDoc(ref, {
                  timeStamp: serverTimestamp(),
                  address: address,
                  addressId: selectedAddress,
                  items: data
              })
              dispatch(setSelectedAddressfull(address))
              navigate("/cart/orderconfirmation")
          } else {
              dispatch(setError("Please add/select a address before checkout"))
          }
      } catch (error) {
        dispatch(setError("Error updating address please try once again"))
      }
    }

    useEffect(() => {
        if (!user) return
        dispatch(setBackDrop(true))
        const unsub = onSnapshot(doc(db, "cart",user.uid), doc => {
            const data = doc.data()
            if (data) {
                const result = data['orderid']
                if (!result) return
                setDataRecivied(true)
                dispatch(setOrderId(result))
                dispatch(setBackDrop(false))
            }
        });
        return () => unsub()
    
    }, [])
    

        return (
            <div className='p-5 gap-5 md:grid grid-cols-3 md:mx-16'>
                <SimpleModal open={open} onClose={() => setOpen(false)}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='p-5 space-y-5'>
                            <Typography variant='h6' fontWeight={600}>Shopping address</Typography>
                            <InputField
                                placeholder='Email ID'
                                fullWidth
                                forminput={{ ...register("email") }}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                            <div className='grid gap-5 md:grid-cols-2'>
                                <InputField
                                    placeholder='First name'
                                    forminput={{ ...register("firstName") }}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName?.message}
                                />
                                <InputField
                                    placeholder='Last name'
                                    forminput={{ ...register("lastName") }}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName?.message}
                                />
                            </div>
                            <InputField
                                fullWidth placeholder='Address'
                                forminput={{ ...register("address") }}
                                error={Boolean(errors.address)}
                                helperText={errors.address?.message}
                            />
                            <InputField
                                fullWidth placeholder='City'
                                forminput={{ ...register("city") }}
                                error={Boolean(errors.city)}
                                helperText={errors.city?.message}
                            />
                            <div className='grid gap-5 md:grid-cols-2'>
                                <InputField
                                    placeholder='Country'
                                    forminput={{ ...register("country") }}
                                    error={Boolean(errors.country)}
                                    helperText={errors.country?.message}
                                />
                                <InputField
                                    placeholder='Pincode'
                                    forminput={{ ...register("pincode") }}
                                    error={Boolean(errors.pincode)}
                                    helperText={errors.pincode?.message}
                                />
                            </div>
                            <InputField
                                fullWidth
                                placeholder='Phone Number'
                                forminput={{ ...register("phone") }}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone?.message}
                            />
                            {/* <div className='flex gap-3'>
                                <input type="checkbox" className='h-4 w-4' />
                                <Typography variant='subtitle2'>Save this as my billing address</Typography>
                            </div> */}
                            <div className='flex space-x-10 justify-center'>
                                <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
                                <Button disabled={backDrop} type='submit' variant='contained'>Save</Button>
                            </div>
                        </div>
                    </form>
                </SimpleModal>
                <div className='col-span-2'>
                    <Typography variant='h6' fontWeight={500}>Add New Contact Information</Typography>
                    <div className='grid md:grid-cols-2 gap-5 justify-center mt-5'>
                        {addresses.map(a => <AddressCard
                            key={a.id}
                            fname={a.firstName}
                            lname={a.lastName}
                            email={a.email}
                            address={a.address}
                            country={a.country}
                            pincode={a.pincode}
                            phone={a.phone}
                            city={a.city}
                            id={a.id}
                            deleteAddress={deleteAddress}
                            editAddress={editAddress}
                        />)}
                    </div>
                    <div className='text-center my-10'><Button variant='contained' onClick={() => setOpen(true)}>Add New Address</Button></div>
                </div>
                <div>
                    <Typography variant='h6' fontWeight={500}>Order Summary</Typography>
                    <OrderSummary />
                        <Button  onClick={updateAddressToDoc} variant='contained' fullWidth>Proceed to payment</Button>
                </div>
            </div>
        )
}
