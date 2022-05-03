import { Alert, Button } from '@mui/material';
import { auth } from '../../../redux-tool/auth';
import { sendEmailVerification } from 'firebase/auth';
import './verify-email.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { logoutUser } from '../../../redux-tool/auth'
import { useState } from 'react';

/* eslint-disable-next-line */
export interface VerifyEmailProps { }

function VerifyEmail(props: VerifyEmailProps) {
  const dispatch = useDispatch();
  const { User, userDetails } = useSelector((state: RootState) => state.User)
  const [sucess, setSucess] = useState("")
  const [error, seterror] = useState("")

  const send = async () => {
    try {
      if (auth?.currentUser) {
        await sendEmailVerification(auth?.currentUser)
        setSucess(`Varification email sent to ${userDetails.email}`)
      }
    } catch (error) {
      seterror("Error Unknow...try to singup again")
    }
  }

  const signOut = () => {
    auth.signOut()
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
              <p > <span> If this is not your email, </span> <span className='pointer-cursor' style={{ color: 'blue' }} onClick={() => dispatch(logoutUser())} > logout  </span><span>and try with your email</span></p>
              <br />
              <p>Still can't find the mail</p>
              <Button
                variant='contained'
                onClick={send}
              >
                Resend Email
              </Button>
              <p style={{ textAlign: "right" }}>Somthing went wrong? <strong onClick={signOut} style={{ color: '#167AF9', cursor: "pointer" }}>Go Back</strong></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VerifyEmail