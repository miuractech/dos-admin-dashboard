import { RootState } from '../../../redux-tool/store';
import { useDispatch, useSelector } from 'react-redux';
import './verify-phone.css';
import { useEffect, useState } from 'react';
import { multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../../redux-tool/auth';
import { Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface VerifyPhoneProps { }

export function VerifyPhone(props: VerifyPhoneProps) {
  const phone = useSelector((state: RootState) => state.User.userDetails.phone)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [verificationID, setVerificationID] = useState("")
  const [err, setErr] = useState("")
  const dispatch = useDispatch()

  const currentUser = auth?.currentUser

  useEffect(() => {

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response: any) => {
        // console.log(response);
      }
    }, auth);
    const onSolvedRecaptcha = async () => {
      try {
        if (currentUser && phone) {
          const mfaAssertion = await multiFactor(currentUser).getSession()
          const phoneInfoOptions = {
            phoneNumber: phone,
            session: mfaAssertion
          };
          console.log('phoneInfoOptions',phoneInfoOptions);
          
          const phoneAuthProvider = new PhoneAuthProvider(auth)
          const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          setVerificationID(verificationId)
        }
      }
      catch (error: any) {
        setErr(error.message);
      }
    }
    onSolvedRecaptcha()
  }, [currentUser, phone])

  let userMultiFactor: any[] = [];
  if (currentUser) userMultiFactor = multiFactor(currentUser).enrolledFactors

  const onSubmit = async (data: any) => {
    try {
      if (userMultiFactor.length === 0) {
        if (data.OTP) {
          const cred = PhoneAuthProvider.credential(verificationID, data.OTP)
          const assertion = await PhoneMultiFactorGenerator.assertion(cred)
          if (currentUser) {
            await multiFactor(currentUser).enroll(assertion)
            currentUser.reload()
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
