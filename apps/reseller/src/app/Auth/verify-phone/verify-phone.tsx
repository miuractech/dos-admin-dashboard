import { RootState } from '../../../redux-tool/store';
import { useSelector } from 'react-redux';
import './verify-phone.css';
import { auth } from '../../../redux-tool/auth';
import { Alert, AlertTitle, Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useForm } from 'react-hook-form';
import { useMfaFirebase } from '@miurac/mfa-firebase';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface VerifyPhoneProps { }

export function VerifyPhone(props: VerifyPhoneProps) {
  const phone = useSelector((state: RootState) => state.User.userDetails.phone)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [alert, setAlert] = useState<string>("")
  const [requestOTP, setRequestOTP] = useState(false)
  const [err, setErr] = useState("")

  const currentUser = auth?.currentUser

  const { verifyOtp, resendOTP, getOTP } = useMfaFirebase({ auth, phone, currentUser })

  const onSubmit = (data: any) => {
    const OTP = data.OTP
    verifyOtp({
      onSuccess: null,
      onFail: (error: any) => setErr(error),
      OTP
    })
  }


  const resend = () => {
    resendOTP({
      onSuccess: () => setAlert("OTP sent successfully"), onFail: (error: any) => {
        setAlert("There was an error please click resend")
        console.log(error);
      }, phone
    })
  }

  const clicked = () => {
    getOTP({
      onSuccess: () => setRequestOTP(true), onFail: (error: any) => {
        console.log(error);
        if (error === "Firebase: Error (auth/too-many-requests).") {
          setAlert("too-many-requests please try after some time")
        }

        if (error === "Firebase: Error (auth/requires-recent-login).") {
          setAlert("Timeout please re-login")
        }

      }, phone
    })
  }

  const signOut = () => {
    auth.signOut()
  }

  if (alert) {
    setTimeout(() => {
      setAlert("")
    }, 3000)
  }

  return (
    <div>
      {alert === "OTP sent successfully" && <Alert severity="success">{alert}</Alert>}
      {alert === "There was an error please click resend" && <Alert severity="error">{alert}</Alert>}
      {alert === "Firebase: Error (auth/requires-recent-login)." && <Alert severity="error">{alert}</Alert>}
      <div className='container'>
        <div className='form'>
          {!requestOTP ?
            <div>
              <h3 style={{ color: "black" }}>Verification</h3>
              <h4 style={{ textAlign: "center" }}>Registered Mobile number is - {phone}</h4>
              <Button fullWidth onClick={clicked} type='submit' variant='contained'>GET OTP</Button>
              <p style={{ textAlign: "right" }}>Somthing went wrong? <strong onClick={signOut} style={{ color: '#167AF9', cursor: "pointer" }}>Go Back</strong></p>
            </div>
            :
            <div>
              <div>
                <h3 style={{ color: "black" }}>Verification</h3>
                <h4 style={{ textAlign: "center" }}>OTP SENT TO MOBILE NUMBER - {phone}</h4>
              </div>
              <InputField fullWidth color='primary' placeholder="Enter OTP" type="number" style={{ textDecoration: "none" }} forminput={{ ...register("OTP") }} />
              <Button fullWidth type='submit' variant='contained'>verify</Button>
              {err && <Typography variant='caption' color={'error'} >{err}</Typography>}
              <p><strong onClick={resend} style={{ color: '#167AF9', cursor: "pointer" }}>Resend OTP</strong></p>
            </div>
          }
        </div>
        <div id="recaptcha"></div>
      </div >
    </div >

  );
}

export default VerifyPhone;