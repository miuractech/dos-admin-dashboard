import './registration1.css';
import InputField from "../../../UI/input-field/input-field"
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactFlagsSelect from "react-flags-select";
import { Prequisits } from "./prequisits"
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { submit } from '../../../redux-tool/auth';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { countryCodes } from './CountryCodes';

const schema = yup.object().shape({
  email: yup.string().email('email must look like abc@example.com').required('email feild cannot be empty')
})
  .required();



/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration(props: Registration1Props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)

  const storeName = params.get("storeName")
  const [selected, setSelected] = useState("IN");
  const [dialCode, setDialCode] = useState("")
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    if (selected === "IN") {
      data.phone = "+91" + data.phone
    } else {
      data.phone = dialCode + data.phone
    }
    dispatch(submit(data))
    navigate("/password")
  }

  useEffect(() => {
    setValue('storeName', storeName)
  }, [setValue, storeName])


  const selectedSize = 15


  const onSelect = (ID: any) => {
    setSelected(ID)
    const phoneCode = countryCodes.find(({ code }) => code === ID);
    if (phoneCode) {
      setDialCode(phoneCode.dial_code);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black" }}>CREATE YOUR SELLER ACCOUNT </h3>
            </div>
            <div className="select">
              <ReactFlagsSelect
                className="menu-flags"
                searchable
                selectedSize={selectedSize}
                selected={selected}
                onSelect={onSelect}
              />
              <InputField fullWidth color='primary' placeholder="Enter Your Phone Number" type="text" forminput={{ ...register("phone") }} />
            </div>
            <InputField color='primary' placeholder="Enter Your Full Name" type="text" forminput={{ ...register("fullName") }} />
            <InputField color='primary' placeholder="Enter Email Address" type="text" forminput={{ ...register("email") }} />
            {errors['email'] && <Typography variant='caption' color={'error'} >
              {errors['email']?.message}
            </Typography>}
            <InputField placeholder='Company or Business name' color='primary' type="text" forminput={{ ...register("storeName") }} />
            <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
            <p style={{ textAlign: "center" }}>Already have an account? <strong onClick={() => navigate("/login")} style={{ color: '#167AF9', cursor: "pointer" }}>Sign In</strong></p>
          </div>
        </div>
      </form>
      <Prequisits />
    </div>
  );
}

export default Registration;


