import InputField from '../../../UI/input-field/input-field'
import React, { useState } from 'react'
import { Alert, AlertTitle, Button } from '@mui/material'
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

    const [alert, setAlert] = useState('')
    const [emailsSuccess, setEmailsSuccess] = useState<boolean | undefined | 'loading'>(undefined)

    const onSubmit = async (data: any) => {
        setEmailsSuccess('loading')
        try {
            await sendPasswordResetEmail(auth, data.email)
            setEmailsSuccess(true)
            setAlert("Password reset link sent")
        } catch (error:any) {
            setEmailsSuccess(false)
            setAlert(error.message);
            console.log(error);
            
        }
    }

    return (
        <div>

                <div className='alert'>
                   { alert && <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {alert} — <strong>check it out!</strong>
                    </Alert>}
                </div>      
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='container'>
                <div className='form'>
                    <div>
                        <h3 style={{ color: "black" }}>RESET PASSWORD</h3>
                    </div>
                    <InputField fullWidth color='primary' placeholder="Email id" type="text" forminput={{ ...register("email") }} />
                    <Button type='submit' disabled={Boolean(emailsSuccess)} variant='contained' color={emailsSuccess?'success':'primary'} fullWidth style={{ height: 56 }} >{emailsSuccess?'Link Sent':'Get Link'}</Button>
                </div>
            </div>
            </form>
        </div>
    )
}
