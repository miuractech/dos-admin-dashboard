import './login.css';
import { Button } from '@mui/material';
import InputField from '../../UI/input-field/input-field';
import { useState } from 'react';
import { RootState } from '../../redux-tool/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux-tool/auth';
import { useForm } from "react-hook-form";

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm()

 const onSubmit = (data: any) => {
  console.log(data);
  
 }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
    <div className='container'>
        <div className='form'>
         <div>
            <h3 style={{ color: "black", height: 60 }}>LOGIN  YOUR SELLER ACCOUNT</h3>
          </div>
            <InputField fullWidth color='primary' placeholder="Email id" type="text" formInput={{ ...register("email") }}/>
            <InputField fullWidth color='primary' placeholder="Password" type="text" formInput={{ ...register("password") }}/>
          <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
          <p style={{ textAlign: "center"}}>You alderdy have an account? <strong>Sign In</strong></p>
        </div>
        </div>
    </div>
    </form>
  );
}

export default Login;
