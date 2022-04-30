import { Button, Typography } from '@mui/material';
import { auth } from '../../../redux-tool/auth';
import { sendEmailVerification } from 'firebase/auth';
import './verify-email.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { logoutUser } from '../../../redux-tool/auth'


/* eslint-disable-next-line */
export interface VerifyEmailProps { }

export function VerifyEmail(props: VerifyEmailProps) {
  const dispatch = useDispatch();
  const { User } = useSelector((state: RootState) => state.User)



  return (

    <div className='container'>
      <div className='form'>
        <div
          style={{ height: '50vh', textAlign: 'center' }}
        >
          <div className='text-center' >
            <h2 style={{ color: "gray" }}>Please verify your email</h2>
            <br />
            <h4 style={{ color: "gray" }}> You're almost there! We sent an email to  <strong style={{ color: "black" }}>{User?.email}</strong> </h4>
            <p > <span> If this is not your email, </span> <span className='pointer-cursor' style={{ color: 'blue' }} onClick={() => dispatch(logoutUser())} > logout  </span><span>and try with your email</span></p>
            <br />
            <p>Still can't find the mail</p>
            <Button
              variant='contained'
              onClick={() => {
                if (auth?.currentUser) {
                  sendEmailVerification(auth?.currentUser)
                }
              }}
            >
              Resend Email
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmail;
