import { Alert, Button } from '@mui/material';
import { auth } from '../../../redux-tool/auth';
import { sendEmailVerification } from 'firebase/auth';
import './verify-email.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { logoutUser } from '../../../redux-tool/auth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface VerifyEmailProps { }

function VerifyEmail(props: VerifyEmailProps) {
  const dispatch = useDispatch();
  const { User, userDetails } = useSelector((state: RootState) => state.User)
  const [sucess, setSucess] = useState("")
  const [error, seterror] = useState("")
  const navigate = useNavigate()

  const send = async () => {
    try {
      if (User) {
        await sendEmailVerification(User)
        setSucess(`Verification email sent to ${userDetails.email}`)
      }
    } catch (error) {
      seterror("Too many attempts please try again later")
      console.log(error);
    }
  }

  const signOut = () => {
    auth.signOut()
    navigate("/login")
  }

  if (error || sucess) {
    setTimeout(() => {
      setSucess("")
      seterror("")
    }, 3000)
  }

  return (
    <div>
      {sucess && <Alert severity="success">{sucess}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <div className='container'>
        <div className='form'>
          <div
            style={{ height: '50vh', textAlign: 'center' }}
          >
            <div className='text-center' >
              <h2 style={{ color: "gray" }}>Please verify your email</h2>
              <br />
              <h4 style={{ color: "gray" }}> You're almost there! We sent an email to  <strong style={{ color: "black" }}>{User?.email}</strong> </h4>
              {/* <p > <span> If this is not your email, </span> <span className='pointer-cursor' style={{ color: 'blue' }} onClick={() => dispatch(logoutUser())} > logout  </span><span>and try with your email</span></p> */}
              <br />
              <p>Still can't find the mail <strong onClick={send} className='cursor-pointer underline text-blue-600'>Resend Email</strong></p>
              <div className='flex gap-10 justify-center mt-5'>
                <Button
                  variant='outlined'
                  onClick={signOut}
                  size="small"
                >
                 back
                </Button>
                <Button
                  variant='contained'
                  onClick={() => window.location.reload()}
                  size="small"
                >
                  Next
                </Button>
              </div>
              {/* <p style={{ textAlign: "right" }}>Somthing went wrong? <strong onClick={signOut} style={{ color: '#167AF9', cursor: "pointer" }}>Go Back</strong></p> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VerifyEmail