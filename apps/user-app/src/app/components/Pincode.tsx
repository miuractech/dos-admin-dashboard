import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../../UI/input-field/input-field'
import * as yup from 'yup';
import {
    httpsCallable,
    getFunctions,
    connectFunctionsEmulator
} from 'firebase/functions';
import { app } from '../../configs/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setcourierpartners, setDeliverydetails, setDeliveryMessage } from '../../store/pincodeSlice';
import { RootState } from '../../store/store';

type Inputs = {
    pincode:string
};

const schema = yup.object().shape({
    pincode: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').required('Pincode is required')
})

export const Pincode = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const functions = getFunctions(app, "asia-south1")
    connectFunctionsEmulator(functions, "localhost", 5001);
    const { ETD,days,message,courierpartners } = useSelector((state: RootState) => state.pincode)
    const dispatch = useDispatch()
    const onSubmit = async(data: Inputs) => {
        try {
            const pincode = httpsCallable(functions, "pincode")
            const result = await (await pincode(data)).data as any
            if (result.status === 200) {
				dispatch(setcourierpartners(result))
                dispatch(setDeliveryMessage(null))
            } else {
                dispatch(setDeliveryMessage("Currently out of stock in this area."))
                dispatch(setDeliverydetails(null))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!courierpartners)return
        const id = courierpartners.data.recommended_courier_company_id
        if (!id) {
            // courierpartners.message
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
    
  return (
      <>
          <InputField
              forminput={{ ...register("pincode") }}
              type="numeric"
              variant='standard'
              inputProps={{ maxLength: "6" }}
              placeholder='Enter your pincode'
              iconend={<Button onClick={handleSubmit(onSubmit)}>Check</Button>}
              className="w-full"
              error={Boolean(errors.pincode)}
			  helperText={errors.pincode?.message}
          />
          {ETD && <Typography variant='subtitle2' className='text-green-600'>Delivery by {ETD}, ({days}days)</Typography>}
          {message && <Typography variant='subtitle2' className='text-red-600'>{message}</Typography>}
      </>
  )
}