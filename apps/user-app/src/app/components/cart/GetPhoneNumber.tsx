import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../UI/input-field/input-field'
import usePhoneAuth from '../../../features/auth/phoneAuthHook'
import * as yup from 'yup';
import { app } from '../../../configs/firebaseConfig'

const schema = yup.object().shape({
    phone: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000, 'enter valid phone number').max(9999999999, 'enter valid phone number').required('phone number is required'),
})
export const GetPhoneNumber = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { sendOtp } = usePhoneAuth(app)
    return (
        <div className='w-96'>
            <form onSubmit={handleSubmit(data => sendOtp(`+91${data['phone']}`))} >
                <InputField placeholder="phonenumber" forminput={{ ...register('phone') }} />
                <Button type="submit" variant='contained'>get otp</Button>
            </form>
        </div>
    )
}
