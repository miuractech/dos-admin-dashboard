import './registration1.css';
import InputField from "../../../UI/input-field/input-field"
import { Button, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ReactFlagsSelect from "react-flags-select";
import { Prequisits } from "./prequisits"
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { submit } from '../../../redux-tool/auth';
import { user, UserDetailState } from '../../../types';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration(props: Registration1Props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState<user>({
    fullName: "",
    email: "",
    phone: "",
    storeName: ""
  })

  const params = new URLSearchParams(window.location.search)
  const storeName = params.get("storeName")
  const [selected, setSelected] = useState("IN");
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm()
  const onSubmit = (data: any) => {
    setUser(data)
    dispatch(submit(data))
    navigate("/password")
  }

  useEffect(() => {
    setValue('storeName', storeName)
  }, [setValue, storeName])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black", height: 60 }}>CREATE YOUR SELLER ACCOUNT </h3>
            </div>
            <div className="select">
              <ReactFlagsSelect
                className="menu-flags"
                searchable
                selected={selected}
                onSelect={(code) => setSelected(code)}
              />
              <InputField fullWidth color='primary' placeholder="Enter Your Phone Number" type="text" formInput={{ ...register("phone") }} />
            </div>
            <InputField color='primary' placeholder="Enter Your Full Name" type="text" formInput={{ ...register("fullName") }} />
            <InputField color='primary' placeholder="Enter Email Address" type="text" formInput={{ ...register("email") }} />
            <InputField color='primary' type="text" formInput={{ ...register("storeName") }} />
            <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
            <p style={{ textAlign: "center" }}>You already have an account? <strong onClick={()=>navigate("/login")} style={{color:'#167AF9', cursor: "pointer"}}>Sign In</strong></p>
          </div>
        </div>
      </form>
      <Prequisits />
    </div>
  );
}

export default Registration;


