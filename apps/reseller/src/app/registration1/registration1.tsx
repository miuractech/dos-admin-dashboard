import './registration1.css';
import InputField from "../../UI/input-field/input-field"
import { Button, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Divider } from '@mui/material';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ReactFlagsSelect from "react-flags-select";

/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration1(props: Registration1Props) {

  const params = new URLSearchParams(window.location.search)
  const storeName = params.get("storeName")
  const [selected, setSelected] = useState("");

  return (
    <div>
      <div className='container'>
        <div className='form'>
          <div>
            <h3 style={{ color: "black", height: 60 }}>CREATE YOUR SELLER ACCOUNT </h3>
          </div>
          <div className="select">
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
            />
            <InputField fullWidth color='primary' placeholder="Enter Your Phone Number" type="text" name='phone' />
          </div>
          <InputField color='primary' placeholder="Enter Your Full Name" type="text" name='fullname' />
          <InputField color='primary' placeholder="Enter Email Address" type="text" name='email' />
          <InputField color='primary' type="text" value={storeName} />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Agree DropOut Store Terms and Conditions" />
          <Button variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
          <p style={{ textAlign: "center" }}>You alderdy have an account? Sign In</p>
        </div>
      </div>
      <div style={{ background: "E5E5E5", padding: "35px" }}>
        <h3 style={{ color: "black", height: 60 }}>PREREQUISITE FOR SELLING</h3>
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
        }].map((doc, index, { length }) =>
          <>
            <div style={{ textAlign: "center" }}>
              <h4>{doc.title}</h4>
              <p>{doc.dis}</p>
            </div>
            {(length - 1 !== index) && <Divider orientation='vertical' variant='middle' flexItem />}
          </>
        )}
      </div>
    </div>
  );
}

export default Registration1;
