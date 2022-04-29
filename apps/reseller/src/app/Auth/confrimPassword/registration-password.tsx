import { Button, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material';
import { auth, createUser } from '../../../redux-tool/auth';
import { RootState } from '../../../redux-tool/store';
import InputField from '../../../UI/input-field/input-field';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';
import { Visibility, VisibilityOff } from '@mui/icons-material';
 

/* eslint-disable-next-line */
export interface RegistrationPasswordProps { }

export function RegistrationPassword(props: RegistrationPasswordProps) {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [checked, setChecked] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [err, setErr] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const firebaseUser = auth.currentUser
  const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPassword(e.target.value)
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value)
    }
  }

  const userEmail = useSelector((state: RootState) => state.User.userDetails.email)

  const clicked =  () => {
    if (password === confirmPassword) {
       dispatch(createUser({ email: userEmail, password: password }))
     
      // navigate("/home")

    } else if (password !== confirmPassword) {
      setErr("Passwords don't match")
    }

  }
  console.log('firebaseUser',firebaseUser);
  
  return (
    <div>
      <div className='container'>
        <div className='form'>
          <div>
            <h3 style={{ color: "black", height: 60 }}>CREATE YOUR SELLER ACCOUNT </h3>
          </div>
          <InputField fullWidth color="primary" placeholder="Enter Your Password" type={viewPassword?'text':"password"} name='password' onChange={changed} InputProps={{endAdornment:viewPassword?<IconButton onClick={()=>setViewPassword(false)} ><VisibilityOff /></IconButton>:<IconButton onClick={()=>setViewPassword(true)} ><Visibility  /></IconButton>}} />
          <InputField fullWidth color='primary' placeholder="Confirm Your Password" type="password" name='confirmPassword' onChange={changed} />
          {err && <Typography color={"secondary"}>{err}</Typography>}
          <FormControlLabel control={<Checkbox color='info' onChange={() => setChecked(!checked)} checked={checked} />} label="Agree DropOut Store Terms and Conditions" />
          <Button onClick={clicked} disabled={!checked} variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
          <p style={{ textAlign: "center" }}>You alderdy have an account? <strong onClick={()=>navigate("/login")} style={{color:'#167AF9', cursor: "pointer"}}>Sign In</strong></p>
        </div>
      </div>
      <Prequisits />
    </div>
  );
}

export default RegistrationPassword;
