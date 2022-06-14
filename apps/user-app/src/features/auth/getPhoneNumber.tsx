import React from 'react'
import InputField from '../../UI/input-field/input-field'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material';

const schema = yup.object().shape({
    phone:yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000,'enter valid phone number').max(9999999999,'enter valid phone number').required('phone number is required')
  })

type Props = {
    sendOtp:(phone:string)=>void,
}

export default function GetPhoneNumber({sendOtp}: Props) {
    const { register, formState:{errors}, handleSubmit } = useForm({resolver:yupResolver(schema)})
  return (
    <form onSubmit={handleSubmit(data=>sendOtp(`+91${data['phone']}`))} >
    <InputField error={Boolean(errors['phone'])} helperText={errors['phone']?.message} forminput={{...register('phone')}} />
    <Button
    type='submit'
    >
      get otp
    </Button>
  </form>
  )
}