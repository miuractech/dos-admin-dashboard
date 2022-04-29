import { Button, Typography } from '@mui/material';
import { auth } from '../../../redux-tool/auth';
import { sendEmailVerification } from 'firebase/auth';
import './verify-email.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';
import { logoutUser } from '../../../redux-tool/auth'


/* eslint-disable-next-line */
export interface VerifyEmailProps {}

export function VerifyEmail(props: VerifyEmailProps) {
  const dispatch = useDispatch();
  const { User } = useSelector((state:RootState)=>state.User)
  return (

<div className='container'>
      <div className='form'>
 <div
    style={{height:'50vh',textAlign:'center'}}
    className='flex justify-center vertical-align'
    >
      <div className='text-center' >  
        <Typography variant='h6' >Verify your email to continue!</Typography>
        <br />
        <Typography variant='body1' > Check your Inbox for verification mail. Your Email Id is <strong>{User?.email}</strong> </Typography>
        <Typography variant='body1' > <span> If this not your email, </span> <span className='pointer-cursor' style={{color:'blue'}} onClick={()=>dispatch(logoutUser())} > logout  </span><span>and try with your email</span></Typography>


        <Button 
        variant='contained'
        onClick={()=>{
          if(auth?.currentUser){
            sendEmailVerification(auth?.currentUser)
          }
        }} 
        >
          Send Verification Link Again
        </Button>
      </div>
    </div>

      </div>
 </div> 
  );
}

export default VerifyEmail;
