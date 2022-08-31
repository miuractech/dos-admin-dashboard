import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../UI/input-field/input-field'
import usePhoneAuth from '../../../features/auth/phoneAuthHook'
import * as yup from 'yup';
import { app } from '../../../configs/firebaseConfig'
import signuplogo from "./assets/signuplogo.png"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { setStep } from '../../../features/auth/authSlice'

const schema = yup.object().shape({
    otp: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(0, 'enter valid otp').max(999999, 'enter valid otp').required('otp is required')
})

export const GetOTP = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { verifyOtp,sendOtp } = usePhoneAuth(app, "/cart")
    const { phoneNumber } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()
    return (
        <div className='w-96 text-center'>
            <img src={signuplogo} alt="logo" className='w-80' />
            <form onSubmit={handleSubmit(data => verifyOtp(data['otp']))} >
              <div className='grid w-4/5 m-auto gap-5 justify-items-center'>
                    {phoneNumber && <Typography className='' fontWeight={500}>We have sent OTP to {phoneNumber.toString().slice(3)}</Typography>}
                    <div>
                    <InputField placeholder="OTP" forminput={{ ...register('otp') }} />
                        {phoneNumber && <div onClick={() => sendOtp(phoneNumber.toString())} className="text-right">
                            <Typography align='right' className='text-blue-600 cursor-pointer' variant='caption'>Resend OTP</Typography>
                        </div>}
                    </div>
                    <Button size='small' type="submit" variant='contained' className='w-1/2'>Submit</Button>
                    <div onClick={() => dispatch(setStep("phone"))}>
                        <Typography className='text-blue-600 cursor-pointer' variant='caption'>choose a diffrent number</Typography>
                    </div>
                </div>
            </form>
        </div>
    )
}
