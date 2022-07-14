import { Button } from '@mui/material'
import React from 'react'
import InputField from '../../UI/input-field/input-field'
import { httpsCallable, getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { app } from '../../firebaseConfig/config';

export const BankVerification = () => {

    const functions = getFunctions(app)
    connectFunctionsEmulator(functions, "localhost", 5001);
    const check = async () => {
        try {
            const verifyBank = httpsCallable(functions, "bank")
            const result = await verifyBank({ text: 'messageText' })
            // const result = await fetch('http://localhost:5001/dropoutstore-8979d/asia-south1/bank', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         "Account": "9183368013898",
            //         "IFSC": "PYTM0123456",
            //         "consent": "Y"
            //     })
            // })
            console.log(result);
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='grid max-w-screen-md gap-5 m-auto my-10'>
            <InputField placeholder='Account Number' />
            <InputField placeholder='IFSC Code' />
            <Button variant='contained' onClick={check}>Check</Button>
        </div>
    )
}