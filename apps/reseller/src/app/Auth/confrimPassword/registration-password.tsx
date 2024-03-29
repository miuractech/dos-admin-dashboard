import { Button, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material';
import { createUser,setErrorString } from '../../../redux-tool/auth';
import { RootState } from '../../../redux-tool/store';
import InputField from '../../../UI/input-field/input-field';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  password: yup.string().required().max(16, 'Password must not exceed 8 characters').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
})
  .required();

/* eslint-disable-next-line */
export interface RegistrationPasswordProps { }

export function RegistrationPassword(props: RegistrationPasswordProps) {

  const [checked, setChecked] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userEmail = useSelector((state: RootState) => state.User.userDetails.email)
  const { phone, storeName, fullName } = useSelector((state: RootState) => state.User.userDetails)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })


  const onSumit = (data: any) => {
    if (data.password === data.confirmPassword) {
      dispatch(createUser({ email: userEmail, password: data.password, storeName: storeName, phone: phone, fullName: fullName }))
    } else if (data.password !== data.confirmPassword) {
      dispatch(setErrorString("Passwords don't match"))
    }
  }

  useEffect(() => {
    if (userEmail === '') {
      navigate('/')
    }
  }, [navigate, userEmail])
  return (
    <div>
      <form onSubmit={handleSubmit(onSumit)}>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black", height: 60 }}>CREATE YOUR SELLER ACCOUNT </h3>
            </div>
            <InputField error={Boolean(errors["password"])}
              fullWidth color="primary" placeholder="Enter Your Password" type={viewPassword ? 'text' : "password"} forminput={{ ...register("password") }} InputProps={{ endAdornment: viewPassword ? <IconButton onClick={() => setViewPassword(false)} ><VisibilityOff /></IconButton> : <IconButton onClick={() => setViewPassword(true)} ><Visibility /></IconButton> }} />
            <InputField
              error={Boolean(errors["password"])}
              helperText={errors["password"]?.message}
              fullWidth color='primary' placeholder="Confirm Your Password" type="password" forminput={{ ...register("confirmPassword") }} />
            <div className='flex gap-2'>
              <input className='h-5 cursor-pointer' type="checkbox" onChange={() => setChecked(!checked)} />
              <Typography>Agree DropOut Store Terms and Conditions</Typography>
            </div>
            <Button type="submit" disabled={!checked} variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
            <p style={{ textAlign: "center" }}>You alderdy have an account? <strong onClick={() => navigate("/login")} style={{ color: '#167AF9', cursor: "pointer" }}>Sign In</strong></p>
          </div>
        </div>
        <Prequisits />
      </form>
    </div>
  );
}

export default RegistrationPassword;
