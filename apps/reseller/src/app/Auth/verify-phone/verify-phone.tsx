import { RootState } from '../../../redux-tool/store';
import { useSelector } from 'react-redux';
import './verify-phone.css';
import { useEffect } from 'react';
import { multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../../redux-tool/auth';

/* eslint-disable-next-line */
export interface VerifyPhoneProps {}

export function VerifyPhone(props: VerifyPhoneProps) {
  const { phone } = useSelector((state:RootState)=>state.User.userDetails)
  console.log(phone);
  const currentUser = auth?.currentUser
  // dispatch()
  // auth.signOut()

 
  useEffect(() => {
    
     const recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        'callback': (response: any) => {
          console.log(response);
          
          // const onSolvedRecaptcha = async () => {
          //  
          //       const verificationCode = prompt('verificationCode')
          //       if(verificationCode){
          //         const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
          //         const assertion = PhoneMultiFactorGenerator.assertion(cred)
          //         multiFactor(currentUser).enroll(assertion)
          //       }
  
          //     }
  
          //   }
          //   catch (error) {
          //     console.log(error);
          //   }
          // }
      }
    }, auth);
    const onSolvedRecaptcha = async () => {
    try {
          if (currentUser) {
            const mfaAssertion = await multiFactor(currentUser).getSession()
            const phoneInfoOptions = {
              phoneNumber: `+91${phone}`,
              session: mfaAssertion
            };
            const phoneAuthProvider = new PhoneAuthProvider(auth)
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            const verificationCode = prompt('verificationCode')
            if(verificationCode){
              const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
              const assertion = PhoneMultiFactorGenerator.assertion(cred)
              multiFactor(currentUser).enroll(assertion)
              currentUser.reload()
            }
          }
        }
        catch (error:any) {
          console.log('error.message',error.message);
        }
      }
      onSolvedRecaptcha()
      }, [])

  
  return (
    <div>
      <h1>An Sms has been sent to Your phone - {phone}</h1>
      <div id="recaptcha"></div>
    </div>
  );
}

export default VerifyPhone;
