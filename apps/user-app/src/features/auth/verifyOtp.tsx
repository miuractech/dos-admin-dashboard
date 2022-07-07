import React from 'react'
import InputField from '../../UI/input-field/input-field'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material';


const schema = yup.object().shape({
  otp: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(0, 'enter valid otp').max(999999, 'enter valid otp').required('otp is required')
})

type Props = {
  verifyOtp: (otp: string) => void
}


// eslint-disable-next-line no-empty-pattern
export default function VerifyOtp({ verifyOtp }: Props) {
  const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
  return (
    <form onSubmit={handleSubmit(data => verifyOtp(data['otp']))} >
      <InputField error={Boolean(errors['otp'])} helperText={errors['otp']?.message} forminput={{ ...register('otp') }} />
      <Button
        type='submit'
      >
        submit
      </Button>
    </form>
  )
}