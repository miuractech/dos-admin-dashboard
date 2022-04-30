import InputField from '../../../UI/input-field/input-field'
import React from 'react'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../redux-tool/auth';


const schema = yup.object().shape({
    email: yup.string().email('email must look like abc@example.com').required('email feild cannot be empty')
})
    .required();

export const PasswordReset = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    })

    // const onSubmit = async (data: any) => {
    //     try {
    //         await sendPasswordResetEmail(auth, data.email)
    //     } catch (error) {

    //     }
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='container'>
                <div className='form'>
                    <div>
                        <h3 style={{ color: "black" }}>RESET PASSWORD</h3>
                    </div>
                    <InputField fullWidth color='primary' placeholder="Email id" type="text" forminput={{ ...register("email") }} />
                    <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} >Get Link</Button>
                </div>
            </div>
        </form>
    )
}
