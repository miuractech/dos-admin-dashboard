import './login.css';
import { Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useDispatch } from 'react-redux'
import { loginUser, auth } from '../../../redux-tool/auth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { setUser } from '../../../redux-tool/auth';
import { useEffect, useState } from 'react';
import { getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, MultiFactorResolver } from 'firebase/auth';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, userDetails } = useSelector((state: RootState) => state.User)
  const [optCheck, setOptCheck] = useState(false)
  const [resolver, setResolver] = useState<MultiFactorResolver>()
  const [verificationId, setverificationId] = useState<string>("")

  // console.log(resolver?.hints[0]);


  const onSubmit = (data: any) => {
    dispatch(loginUser({ data, onSuccess: () => setOptCheck(true) }))
  }

  useEffect(() => {
    const secondAuth = async () => {
      try {
        if (error && (error.code === 'auth/multi-factor-auth-required')) {
          const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
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
            const verificationId = await phoneProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            setverificationId(verificationId)
          }

        }

      } catch (error: any) {
        console.log(error);
      }
    }

    secondAuth()


  }, [error])

  const onOtpSubmit = async (data: any) => {
    try {
      if (resolver) {
        const cred = PhoneAuthProvider.credential(verificationId, data.OTP)
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
        await resolver.resolveSignIn(multiFactorAssertion)
        await auth?.currentUser?.reload()
        const newUser = auth.currentUser
        dispatch(setUser(newUser))
      }

    } catch (error: any) {
      console.log(error.message);

    }
  }


  return (
    <div>

      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore */}
      {(error && (error.code === 'auth/multi-factor-auth-required')) ?
        <form onSubmit={handleSubmit(onOtpSubmit)}>
          <div className='container'>
            <div className='form'>
              <div>
                <h3 style={{ color: "black" }}>Verification</h3>
                <h4 style={{ textAlign: "center" }}>OTP SENT TO MOBILE NUMBER - </h4>
              </div>
              <InputField fullWidth color='primary' placeholder="Enter OTP" type="number" style={{ textDecoration: "none" }} forminput={{ ...register("OTP") }} />
              <Button type='submit' variant='contained'>verify</Button>
              {/* {err && <Typography variant='caption' color={'error'} >
               {err}
             </Typography>}
             <p><strong onClick={resend} style={{ color: '#167AF9', cursor: "pointer" }}>Resend OTP</strong></p> */}
            </div>
          </div>
          <div id="recaptcha"></div>
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
              {error && <Typography variant='caption' color={'error'} >
                {error?.message}
              </Typography>}
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
  );
}

export default Login;
