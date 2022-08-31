import './login.css';
import { Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useDispatch } from 'react-redux'
import { loginUser, auth, setError, setErrorString } from '../../../redux-tool/auth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { setUser } from '../../../redux-tool/auth';
import { useEffect, useState } from 'react';
import { getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, MultiFactorResolver, MultiFactorError } from 'firebase/auth';
import { useMfaFirebase } from '@miurac/mfa-firebase';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, userDetails, User, Errorstring } = useSelector((state: RootState) => state.User)
  const [optCheck, setOptCheck] = useState(false)
  const [resolver, setResolver] = useState<MultiFactorResolver>()
  const [verificationId, setverificationId] = useState<string>("")
  const [mfaError, setmfaError] = useState<any>(null)
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('')

  // console.log(resolver?.hints[0]);


  const onSubmit = (data: any) => {
    dispatch(loginUser({ data, onSuccess: () => { dispatch(setError(null)); setOptCheck(true) } }))
  }

  useEffect(() => {
    const secondAuth = async () => {
      try {
        if (error && (error.code === 'auth/multi-factor-auth-required')) {
          setmfaError(error)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.mfaRecaptcha = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
          }, auth);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const resolver = getMultiFactorResolver(auth, error)
          setResolver(resolver);
          if (resolver.hints[0].factorId ===
            PhoneMultiFactorGenerator.FACTOR_ID) {
            const phoneInfoOptions = {
              multiFactorHint: resolver.hints[0],
              session: resolver.session
            };
            const phoneProvider = new PhoneAuthProvider(auth)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const verificationId = await phoneProvider.verifyPhoneNumber(phoneInfoOptions, window.mfaRecaptcha)
            setverificationId(verificationId)
          }
        }
      } catch (error: any) {
        dispatch(setErrorString("Error sending OTP retry again"))
        console.log(error);
      }
    }
    secondAuth()
  }, [error])

  const resend = async() => {
  try {
    if (!mfaError) return
    console.log(mfaError);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!window.mfaRecaptcha) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.mfaRecaptcha = new RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
      }, auth);
    }
    const resolver = getMultiFactorResolver(auth, mfaError)
    setResolver(resolver);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMaskedPhoneNumber(resolver.hints[0].phoneNumber)
    if (resolver.hints[0].factorId ===
      PhoneMultiFactorGenerator.FACTOR_ID) {
      const phoneInfoOptions = {
        multiFactorHint: resolver.hints[0],
        session: resolver.session
      };
      const phoneProvider = new PhoneAuthProvider(auth)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      phoneProvider.verifyPhoneNumber(phoneInfoOptions, window.mfaRecaptcha)
        .then(verificationId => {
          setverificationId(verificationId)
        })
    }
  } catch (error) {
    console.log(error);
    dispatch(setErrorString("Error resending OTP retry again"))
  }
  }

  const onOtpSubmit = async (data: any) => {
    try {
      if (resolver) {
        const cred = PhoneAuthProvider.credential(verificationId, data.OTP)
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
        await resolver.resolveSignIn(multiFactorAssertion)
        await auth?.currentUser?.reload()
        const newUser = auth.currentUser
        dispatch(setUser(newUser));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setErrorString("Invalid OTP try again"))
    }
  }
  return (
    <>
      <div>
        {(error && (error.code === 'auth/multi-factor-auth-required')) ?
          <form onSubmit={handleSubmit(onOtpSubmit)}>
            <div className='container'>
              <div className='form'>
                <div>
                  <h3 style={{ color: "black" }}>Verification</h3>
                  <h4 style={{ textAlign: "center" }}>OTP SENT TO REGISTERED MOBILE NUMBER {User?.phoneNumber}</h4>
                </div>
                <InputField
                  error={Boolean(Errorstring)}
                  helperText={Errorstring}
                  fullWidth color='primary' placeholder="Enter OTP" type="number" style={{ textDecoration: "none" }} forminput={{ ...register("OTP") }} />
                <Button type='submit' variant='contained'>verify</Button>
                <p><strong onClick={resend} style={{ color: '#167AF9', cursor: "pointer" }}>Resend OTP</strong></p>
              </div>
            </div>
          </form>
          :
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='container'>
              <div className='form'>
                <div>
                  <h3 style={{ color: "black" }}>LOGIN  YOUR SELLER ACCOUNT</h3>
                </div>
                <InputField style={{ margin: 8 }} fullWidth color='primary' placeholder="Email id" type="text" forminput={{ ...register("email") }} />
                <InputField style={{ margin: 8 }} fullWidth color='primary' placeholder="Password" type="password" forminput={{ ...register("password") }} />
                <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign In</Button>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", columnGap: "25px" }}>
                  <p style={{ textAlign: "center" }}>Don't have an account? <strong onClick={() => navigate("/signup")} style={{ color: '#167AF9', cursor: "pointer" }}>Sign Up</strong></p>
                  <p><strong onClick={() => navigate("/password_reset")} style={{ color: '#167AF9', cursor: "pointer" }}>Forgot password?</strong></p>
                </div>
              </div>
            </div>
          </form>
        }
        <Prequisits />
      </div>
      <div id="recaptcha"></div>
    </>
  );
}

export default Login;
