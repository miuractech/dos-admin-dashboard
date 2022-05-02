import { useState, useEffect } from 'react';
import { multiFactor, PhoneAuthProvider, RecaptchaVerifier, Auth, User, PhoneMultiFactorGenerator } from 'firebase/auth';

/* eslint-disable-next-line */
export interface MfaFirebaseProps {
  auth: Auth
  phone: string
  currentUser: User | null
  OTP: string
}   

export const useMfaFirebase = ({auth, phone, currentUser, OTP}:MfaFirebaseProps) => {
  
  const [verificationID, setVerificationID] = useState("")
  const [err, setErr] = useState("")

   useEffect(() => {
       const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        }, auth);
       const onSolvedRecaptcha = async () => {
      try {
        if (currentUser && phone) {
          const mfaAssertion = await multiFactor(currentUser).getSession()
          const phoneInfoOptions = {
            phoneNumber: phone,
            session: mfaAssertion
          };
          console.log('phoneInfoOptions', phoneInfoOptions);

          const phoneAuthProvider = new PhoneAuthProvider(auth)
         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          const cred = PhoneAuthProvider.credential(verificationId, OTP)
          const assertion = await PhoneMultiFactorGenerator.assertion(cred)
          await multiFactor(currentUser).enroll(assertion)
          currentUser.reload()
        }
      }
      catch (error: any) {
        setErr(error.message);
      }
    }
     
     onSolvedRecaptcha()
     
   }, [currentUser, phone, auth])
  
  return {verificationID, err}
  
}

export default useMfaFirebase;
