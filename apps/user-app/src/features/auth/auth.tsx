import './auth.css';
import { app } from '../../configs/firebaseConfig';
import usePhoneAuth from './phoneAuthHook';
import InputField from '../../UI/input-field/input-field';

import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GetPhoneNumber from './getPhoneNumber';
import VerifyOtp from './verifyOtp';
import { removeUserError } from './authSlice';


/* eslint-disable-next-line */
export interface AuthProps { }

export function Auth(props: AuthProps) {

  const { user, loading, error, step } = useSelector((state: RootState) => state.User)
  const { sendOtp, verifyOtp } = usePhoneAuth(app, '/home')
  const dispatch = useDispatch()
  const currentComponent = () => {
    if (!step) return
    switch (step) {
      case 'phone':
        return <GetPhoneNumber sendOtp={sendOtp} />
      case 'otp':
        return <VerifyOtp verifyOtp={verifyOtp} />
      default:
        return <>unknown error</>;
    }
  }

  console.log('user', user);

  return (
    <div>
      {loading ?
        <CircularProgress />
        :
        currentComponent()
      }
      <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={() => dispatch(removeUserError())}>
        <Alert severity='error'>{error?.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default Auth;

