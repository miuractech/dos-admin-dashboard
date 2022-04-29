import { Button, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-tool/auth';
import './homepage.css';
import { RootState } from '../../redux-tool/store';
import { auth } from '../../redux-tool/auth';
import { multiFactor, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier, PhoneMultiFactorGenerator } from 'firebase/auth';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import { app } from '../../firebaseConfig/config';
/* eslint-disable-next-line */
export interface HomepageProps { }

export function Homepage(props: HomepageProps) {
  const dispatch = useDispatch()
  const { User } = useSelector((state: RootState) => state.User)
  const logout = () => {
    dispatch(logoutUser())
  }


  // useEffect(() => {
  //   const currentUser = auth?.currentUser
  //   auth.settings.appVerificationDisabledForTesting = true
  //   const appVerifier = new RecaptchaVerifier('recaptcha',{},auth)
  //   const check = async () => {
  //     try {
  //       if (currentUser) {
  //         const mfaAssertion = await multiFactor(currentUser).getSession()
  //         const phoneInfoOptions = {
  //           phoneNumber: '+918971892050',
  //           session: mfaAssertion
  //         };
  //         const phoneAuthProvider = new PhoneAuthProvider(auth)
  //         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions,appVerifier)
  //         const cred = PhoneAuthProvider.credential(verificationId,'564565')
  //         const assertion = PhoneMultiFactorGenerator.assertion(cred)
  //         multiFactor(currentUser).enroll(assertion)

  //       }

  //     }

  //     catch (error) {
  //       console.log(error);

  //     }
  //   }
  //   check()
  // }, [])
  if (auth.currentUser) {
    console.log(multiFactor(auth.currentUser).enrolledFactors);
  }


  return (
    <div style={{ textAlign: "center" }}>
      <h1>logged in</h1>
      <div
        id='recaptcha'
      >

      </div>
      <Button
        onClick={logout}
        variant='contained' color='primary'>Log Out</Button>
    </div>
  );
}

export default Homepage;
