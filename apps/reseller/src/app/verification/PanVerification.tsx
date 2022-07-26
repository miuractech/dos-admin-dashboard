import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputField from '../../UI/input-field/input-field'
import pan from "./pancard.svg"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../firebaseConfig/config';
import { setBackDrop } from '../../redux-tool/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import verified from "./verified.json"
import Lottie from "lottie-react";

type Inputs = {
    name: string,
    panNumber: string
};

const schema = yup.object({
    name: yup.string().min(3).required("Name is a requried"),
    panNumber: yup.string()
        .required("PAN is Required")
        .test(
            "PAN",
            "PAN must be of length 10",
            (value) => value?.length === 10
        )
        .matches(
            /^[A-Z]{5}[a-zA-Z0-9]{5}$/,
            "First 5 characters must be alphabets and last 5 characters must be numbers"
        ),
})

export const PanVerification = () => {
    const [validData, setValidData] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const functions = getFunctions(app,"asia-south1")
    connectFunctionsEmulator(functions, "localhost", 5001);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data: Inputs) => {
        try {
            dispatch(setBackDrop(true))
            const verifiyPan = httpsCallable(functions, "pan")
            const result = await verifiyPan(data)
            console.log(result);
            //  setValidData(true)
            dispatch(setBackDrop(false))
        } catch (error) {
            console.log(error)
            dispatch(setBackDrop(false))
        }
    }
    return (
        <div className='my-10 mx-2 space-y-5 md:max-w-2xl md:m-auto md:shadow-2xl md:p-10'>
            {validData ? (
                <div className='space-y-5'>
                    <Lottie animationData={verified} loop={true} className="h-16" />
                    <Typography fontWeight={600} className='text-center' variant='h6'>PAN IS VALID</Typography>
                    <div className='space-y-5'>
                        <div className='flex'>
                            <Typography variant='subtitle2' className='w-1/2 text-gray-500 md:pl-32'>Name Provided :</Typography>
                            <Typography variant='subtitle2' fontWeight={500} className="md:pl-10">KIRAN</Typography>
                        </div>
                        <div className='flex'>
                            <Typography variant='subtitle2' className='w-1/2 text-gray-500 md:pl-32'>PAN :</Typography><Typography className="md:pl-10" variant='subtitle2' fontWeight={500}>DTWPK233332E</Typography>
                        </div>
                        <div className='self-center justify-self-center w-1/2 m-auto'>
                            <Button type='submit' variant='contained' fullWidth onClick={() => navigate("/bankstatement")}>Next</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-5'>
                        <div className='text-center'>< img src={pan} alt="pan" height={40} /></div>
                        <Typography textAlign='center' variant='h5' fontWeight={500}>VERIFY PAN</Typography>
                        <div>
                            <Typography>PAN:</Typography>
                            <InputField
                                placeholder='PAN number'
                                fullWidth
                                forminput={{ ...register("panNumber") }}
                                error={Boolean(errors.panNumber)}
                                helperText={errors.panNumber?.message}
                            />
                        </div>
                        <div>
                            <Typography>Name:</Typography>
                            <InputField
                                placeholder='Name'
                                fullWidth
                                forminput={{ ...register("name") }}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </div>
                        <div className='self-center justify-self-center w-full'>
                            <Button type='submit' variant='contained' fullWidth>Verify</Button>
                        </div>
                    </div>
                </form >
            )
            }
        </div >
    )
}
