import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../UI/input-field/input-field'
import usePhoneAuth from '../../../features/auth/phoneAuthHook'
import * as yup from 'yup';
import { app } from '../../../configs/firebaseConfig'

const schema = yup.object().shape({
    otp: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(0, 'enter valid otp').max(999999, 'enter valid otp').required('otp is required')
})

export const GetOTP = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { verifyOtp } = usePhoneAuth(app, '/cart/shippingmethod')
    return (
        <div className='w-96'>
            <form onSubmit={handleSubmit(data => verifyOtp(data['otp']))} >
                <InputField placeholder="OTP" forminput={{ ...register('otp') }} />
                <Button type="submit" variant='contained'>otp</Button>
            </form>
        </div>
    )
}
