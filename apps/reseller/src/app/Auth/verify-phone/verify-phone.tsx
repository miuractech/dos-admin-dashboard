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
  const [timer, setTimer] = useState(false)
  const [seconds, setSeconds] = useState<number>(30)

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
      onSuccess: () => {
        const timerId = setInterval(() => {
            setSeconds(t => {
              if (t === 0) {
                clearTimeout(timerId);
                setTimer(false)
                return 30
              }else{
                return t - 1
              }
            })
          }, 1000);
        setAlert("OTP sent successfully")
        setTimer(true)
      }, onFail: (error: any) => {
        setAlert("There was an error please click resend")
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





  // useEffect(() => {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds('BOOOOM!');
  //   }
  // });

  return (
    <div>
      <div style={{ position: "absolute", width: "100%" }}>
        {alert === "OTP sent successfully" && <Alert severity="success">{alert}</Alert>}
        {alert === "There was an error please click resend" && <Alert severity="error">{alert}</Alert>}
        {alert === "Timeout please re-login" && <Alert severity="error">{alert}</Alert>}
        {alert === "too-many-requests please try after some time" && <Alert severity='error'>{alert}</Alert>}
      </div>
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
              {timer ? <p><strong>wait for to resend OTP : {seconds} seconds</strong></p> : <p><strong onClick={resend} style={{ color: '#167AF9', cursor: "pointer" }}>Resend OTP</strong></p>}
            </div>
          }
        </div>
        <div id="recaptcha"></div>
      </div >
    </div >

  );
}

export default VerifyPhone;