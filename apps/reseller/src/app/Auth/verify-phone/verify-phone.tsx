import { RootState } from '../../../redux-tool/store';
import { useSelector } from 'react-redux';
import './verify-phone.css';
import { multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth';
import { auth } from '../../../redux-tool/auth';
import { Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useForm } from 'react-hook-form';
import { useMfaFirebase } from '@miurac/mfa-firebase';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface VerifyPhoneProps { }

export function VerifyPhone(props: VerifyPhoneProps) {
  const phone = useSelector((state: RootState) => state.User.userDetails.phone)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [OTP, setOTP] = useState("")

  const currentUser = auth?.currentUser

  const {verificationID, err} = useMfaFirebase({auth, phone, currentUser, OTP})

  let userMultiFactor: any[] = [];
  if (currentUser) userMultiFactor = multiFactor(currentUser).enrolledFactors

  const onSubmit = async (data: any) => {
    setOTP(data.OTP)
    try {
      if (userMultiFactor.length === 0) {
        if (data.OTP) {
         
            // const userMultiFactor = multiFactor(currentUser).enrolledFactors
            // await multiFactor(currentUser).unenroll(userMultiFactor[0])
          }
        }
      }
      window.location.reload()
    } catch (error: any) {
      console.log("error", error.message);

    }
  }


  const resend = () => {
    console.log(resend);
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black" }}>Verification</h3>
              <h4 style={{ textAlign: "center" }}>OTP SENT TO MOBILE NUMBER - {phone}</h4>
            </div>
            <InputField fullWidth color='primary' placeholder="Enter OTP" type="number" style={{ textDecoration: "none" }} forminput={{ ...register("OTP") }} />
            <Button type='submit' variant='contained'>verify</Button>
            {err && <Typography variant='caption' color={'error'} >
              {err}
            </Typography>}
            <p><strong onClick={resend} style={{ color: '#167AF9', cursor: "pointer" }}>Resend OTP</strong></p>
          </div>
        </div>
        <div id="recaptcha"></div>
      </form>
    </div >
  );
}

export default VerifyPhone;
