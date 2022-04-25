import './registration1.css';
import InputField from "../../UI/input-field/input-field"
import { Button } from '@mui/material';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration1(props: Registration1Props) {

  const params = new URLSearchParams(window.location.search)
  const storeName = params.get("storeName")
  console.log(storeName);

  // const [age, setAge] = useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <div>
      <div className='container'>
        <div className='form'>
          <h3 style={{ color: "black" }}>CREATE YOUR SELLER ACCOUNT </h3>
          <InputField placeholder="Enter Your Phone Number" type="text" />
          <InputField placeholder="Enter Your Full Name" type="text" />
          <InputField placeholder="Enter Email Address" type="text" />
          <InputField type="text" value={storeName ? storeName : ""} />
          <Button variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
        </div>
      </div>
      <div className='details'>
        {[{
          title: "ADDRESS",
          dis: "You need a business Address"
        },
        {
          title: "BANK DETAILS",
          dis: " You need your bank details for selling"
        },
        {
          title: "PAN DETAILS",
          dis: " You need to provide PAN details for selling"
        }].map(doc => <div>
          <h4>{doc.title}</h4>
          <p>{doc.dis}</p>
        </div>)}
      </div>
    </div>
  );
}

export default Registration1;
