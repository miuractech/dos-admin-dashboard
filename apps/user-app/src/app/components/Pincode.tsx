import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material'
import { registerVersion } from 'firebase/app'
import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../../UI/input-field/input-field'
import * as yup from 'yup';

type Inputs = {
    pincode:string
};

const schema = yup.object().shape({
    pincode: yup.number().min(5).typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').required('Pincode is required')
})

export const Pincode = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const onSubmit = (data: Inputs) => {
        console.log(data);
    }
  return (
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
  )
}
