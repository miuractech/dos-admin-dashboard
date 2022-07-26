import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputField from '../../UI/input-field/input-field'
import { 
    httpsCallable, 
    getFunctions, 
    connectFunctionsEmulator 
} from 'firebase/functions';
import { app } from '../../firebaseConfig/config';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { setBackDrop } from '../../redux-tool/auth';
import { useDispatch } from 'react-redux';
import { AccountBalance } from '@mui/icons-material';
import verified from "./verified.json"
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().min(3).required("Name is a requried"),
    mobileNumber: yup.number().typeError('Enter only numbers').positive('Cannot contain special characters').integer('Cannot contain special characters').min(6000000000, 'Enter valid phone number').max(9999999999, 'enter valid phone number').required('Mobile Number is required'),
    accountNumber: yup.number().min(10000000, "Enter valid account number").typeError('Enter only numbers').positive('Cannot contain special characters').integer('Cannot contain special characters').required('Account Number is required'),
    ifscCode: yup.string()
        .required("IFSC Code Is Required")
        .test(
            "IFSC Code",
            "IFSC Code must be of length 11",
            (value) => value?.length === 11
        )
        .matches(
            /^[A-Z]{4}[a-zA-Z0-9]{7}$/,
            "First 4 characters must be alphabets and last 7 characters must be number"
        ),
})

type Inputs = {
    name: string,
    mobileNumber: string,
    accountNumber: string,
    ifscCode: string
};

export const BankVerification = () => {
    const [validData, setValidData] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const functions = getFunctions(app, 'asia-south1')
    connectFunctionsEmulator(functions, "localhost", 5001);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data: Inputs) => {
        try {
            dispatch(setBackDrop(true))
            const verifyBank = httpsCallable(functions, "bank")
            const result = await verifyBank(data)
            console.log(result)
            dispatch(setBackDrop(false))
            // setValidData(true)
        } catch (error) {
            console.log('err', error)
            dispatch(setBackDrop(false))
        }
    }
    return (
        <Box className='px-2 my-5 p-5  md:max-w-2xl md:m-auto md:shadow-2xl md:p-10'>
            {validData ? (
                <div className='space-y-5'>
                    <Lottie animationData={verified} loop={true} className="h-16" />
                    <Typography fontWeight={600} className='text-center' variant='h6'>BANK ACCOUNT IS VALID</Typography>
                    <div className='space-y-5'>
                        <div className='flex'>
                            <Typography variant='subtitle2' className='w-1/2 text-gray-500 md:pl-32'>Name Provided :</Typography>
                            <Typography variant='subtitle2' fontWeight={500} className="md:pl-10">KIRAN</Typography>
                        </div>
                        <div className='flex'>
                            <Typography variant='subtitle2' className='w-1/2 text-gray-500 md:pl-32'>Bank A/C No :</Typography><Typography className="md:pl-10" variant='subtitle2' fontWeight={500}>123456789987456</Typography>
                        </div>
                        <div className='flex'>
                            <Typography variant='subtitle2' className='w-1/2 text-gray-500 md:pl-32'>IFSC  :</Typography><Typography className="md:pl-10" variant='subtitle2' fontWeight={500}>ABCD1234567</Typography>
                        </div>
                        <div className='self-center justify-self-center w-1/2 m-auto'>
                            <Button type='submit' variant='contained' fullWidth onClick={() => navigate("/panverification")}>Next</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex justify-center'><AccountBalance fontSize='large' /></div>
                    <Typography className='mb-7 mt-3 text-center' fontWeight={500} variant='h5'>Bank Verification</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-rows-5 gap-7'>
                            <div>
                                <Typography>Name :</Typography>
                                <InputField
                                    placeholder='Name as per Bank'
                                    fullWidth
                                    forminput={{ ...register("name") }}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                            </div >
                            <div>
                                <Typography>Mobile Number :</Typography>
                                <InputField
                                    placeholder='Mobile linked to bank'
                                    fullWidth
                                    forminput={{ ...register("mobileNumber") }}
                                    error={Boolean(errors.mobileNumber)}
                                    helperText={errors.mobileNumber?.message}
                                />
                            </div>
                            <div>
                                <Typography>Account Number :</Typography>
                                <InputField
                                    placeholder='Account Number'
                                    fullWidth
                                    forminput={{ ...register("accountNumber") }}
                                    error={Boolean(errors.accountNumber)}
                                    helperText={errors.accountNumber?.message}
                                />
                            </div>
                            <div>
                                <Typography>IFSC Code :</Typography>
                                <InputField
                                    placeholder='IFSC Code'
                                    fullWidth
                                    forminput={{ ...register("ifscCode") }}
                                    error={Boolean(errors.ifscCode)}
                                    helperText={errors.ifscCode?.message}
                                />
                            </div>
                            <div className='self-center justify-self-center w-full'>
                                <Button type='submit' variant='contained' fullWidth>Verify</Button>
                            </div>
                        </div >
                    </form >
                </>
            )}
        </Box >
    )
}