import './login.css';
import { Button, Typography } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux-tool/auth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-tool/store';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.User)



  const onSubmit = (data: any) => {
    dispatch(loginUser(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black" }}>LOGIN  YOUR SELLER ACCOUNT</h3>
            </div>
            <InputField fullWidth color='primary' placeholder="Email id" type="text" forminput={{ ...register("email") }} />
            <InputField fullWidth color='primary' placeholder="Password" type="password" forminput={{ ...register("password") }} />
            {error && <Typography variant='caption' color={'error'} >
              {error}
            </Typography>}
            <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign In</Button>
            <p style={{ textAlign: "center" }}>Don't have an account? <strong onClick={() => navigate("/signup")} style={{ color: '#167AF9', cursor: "pointer" }}>Sign Up</strong></p>
          </div>
        </div>
      </div>
      <Prequisits />
    </form>
  );
}

export default Login;
