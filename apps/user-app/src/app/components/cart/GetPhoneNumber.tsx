import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../UI/input-field/input-field'
import usePhoneAuth from '../../../features/auth/phoneAuthHook'
import * as yup from 'yup';
import { app } from '../../../configs/firebaseConfig'
import authlogo from "./assets/authlogo.png"
import { setPhone } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'

const schema = yup.object().shape({
    phone: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000, 'enter valid phone number').max(9999999999, 'enter valid phone number').required('phone number is required'),
})
export const GetPhoneNumber = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { sendOtp } = usePhoneAuth(app)
    const dispatch = useDispatch()
    return (
        <div className='w-96 text-center'>
                     <img src = { authlogo } alt = "logo" className = 'w-96'/>
            <form onSubmit={handleSubmit(data => { sendOtp(`+91${data['phone']}`); dispatch(setPhone(data['phone']))})} >
                <div className='grid w-4/5 m-auto gap-5 justify-items-center'>
                    <InputField placeholder="Enter Your Number" forminput={{ ...register('phone') }} />
                    <Button size='small' type="submit" variant='contained' className='w-1/2'>Login</Button>
                </div>
            </form>
        </div>
    )
}
