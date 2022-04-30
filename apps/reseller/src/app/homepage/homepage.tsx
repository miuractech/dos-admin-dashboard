import { Button, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-tool/auth';
import './homepage.css';
import { RootState } from '../../redux-tool/store';
import { auth } from '../../redux-tool/auth';
import { multiFactor, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier, PhoneMultiFactorGenerator, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import { app, db } from '../../firebaseConfig/config';
import {doc, getDoc} from "firebase/firestore"; 
/* eslint-disable-next-line */
export interface HomepageProps { }

  export function Homepage(props: HomepageProps) {
  const dispatch = useDispatch()
    const { email, phone, fullName, storeName } = useSelector((state: RootState) => state.User.userDetails)
    
    console.log(email, phone, fullName, storeName);
    
  const logout = () => {
    dispatch(logoutUser())
  }

  const currentUser = auth?.currentUser

//   const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
//  'size': 'invisible',
//     'callback': (response: any) => {
//     const onSolvedRecaptcha = async () => {
//       try {
//         if (currentUser) {
//           const mfaAssertion = await multiFactor(currentUser).getSession()
//           const phoneInfoOptions = {
//             phoneNumber: '+918971892050',
//             session: mfaAssertion
//           };
//           const phoneAuthProvider = new PhoneAuthProvider(auth)
//           const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
//           const verificationCode = prompt('verificationCode')
//           if(verificationCode){
//             const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
//             const assertion = PhoneMultiFactorGenerator.assertion(cred)
//             multiFactor(currentUser).enroll(assertion)
//           }

//         }

//       }
//       catch (error) {
//         console.log(error);
//       }
//     }
//  }
// }, auth);

 

 
//   useEffect(() => {
    
//     // auth.settings.appVerificationDisabledForTesting = true
//     // const appVerifier = new RecaptchaVerifier('recaptcha', {}, auth)
//     // const check = 
//        onSolvedRecaptcha()
//   }, [])



  if (auth.currentUser) {
    console.log(multiFactor(auth.currentUser).enrolledFactors);
    console.log(auth.currentUser);
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
