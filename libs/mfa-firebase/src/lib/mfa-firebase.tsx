import { useState, useEffect } from 'react';
import { multiFactor, PhoneAuthProvider, RecaptchaVerifier, Auth, User, PhoneMultiFactorGenerator, ApplicationVerifier, MultiFactorAssertion, MultiFactorSession } from 'firebase/auth';

/* eslint-disable-next-line */
export interface MfaFirebaseProps {
  auth: Auth
  phone: string
  currentUser: User | null
}

export const useMfaFirebase = ({ auth }: MfaFirebaseProps) => {

  const [verificationId, setVerificationId] = useState<null | string>(null)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<ApplicationVerifier | null>(null)
  const [mfaAssertion, setmfaAssertion] = useState<MultiFactorSession | null>(null)
  const currentUser = auth.currentUser


  useEffect(() => {
    if (currentUser) {


      setRecaptchaVerifier(recaptchaVerifier)
    }
  }, [currentUser, auth])



  const getOTP = async ({ onSuccess, onFail, phone }: any) => {
    try {
      if (currentUser && phone) {
        if (!recaptchaVerifier) {
          const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
          }, auth);
          setRecaptchaVerifier(recaptchaVerifier)
        }
        const mfaAssertion = await multiFactor(currentUser).getSession()
        setmfaAssertion(mfaAssertion)
        const phoneInfoOptions = {
          phoneNumber: phone,
          session: mfaAssertion
        };
        const phoneAuthProvider = new PhoneAuthProvider(auth)
        if (recaptchaVerifier) {
          const Id = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          setVerificationId(Id)
          onSuccess()
        }
      }
    }
    catch (error: any) {
      onFail(error.message)
    }

  }


  const verifyOtp = async ({ OTP, onSuccess, onFail }: any) => {
    try {
      if (verificationId && currentUser) {
        const cred = PhoneAuthProvider.credential(verificationId, OTP)
        const assertion = await PhoneMultiFactorGenerator.assertion(cred)
        await multiFactor(currentUser).enroll(assertion)
        currentUser.reload()
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error: any) {
      if (onFail) {
        onFail(error.message)
      }
    }
  }

  const resendOTP = async ({ onSuccess, onFail, phone }: any) => {
    try {
      if (currentUser && phone) {
        if (!recaptchaVerifier) {
          const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
          }, auth);
          setRecaptchaVerifier(recaptchaVerifier)
        }
        const phoneInfoOptions = {
          phoneNumber: phone,
          session: mfaAssertion
        };
        const phoneAuthProvider = await new PhoneAuthProvider(auth)
        if (recaptchaVerifier) {
          const Id = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          setVerificationId(Id)
          onSuccess()
        }
      }
    } catch (error: any) {
      onFail(error);
    }
  }

  return { verifyOtp, resendOTP, getOTP }
}

export default useMfaFirebase;

