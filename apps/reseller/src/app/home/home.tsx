import { Grid } from '@mui/material';
import { useState } from 'react';
import { string } from 'yup';
import InputField from '../../UI/input-field/input-field';
import './home.css';

/* eslint-disable-next-line */
export interface HomeProps { }

export function Home(props: HomeProps) {

  const [storeName, setStoreName] = useState<string | null>(null)

  const clicked = () => {
    window.location.href = `/registration?storeName=${storeName}`

  }

  const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value)
  }

  return (
    <div>
      <div className="main" >
        <div className='center'>
          <h1>Register With Us!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis sit lectus ut <br />ullamcorper enim, ullamcorpe.</p>
          <div className='input'>
            <InputField style={{ width: "35vw" }} onChange={changed} type="text" placeholder='Company or Business name' />
            <button style={{ width: "15vw" }} onClick={clicked}> Register Here For Selling</button>
          </div>
        </div>
      </div >
      <Grid container spacing={3} justifyContent='center' >
        {[{
          text:'abc',
          name:'cool',
        }, 
        {
          text:'def',
          name:'cool2',
        },
        {
          text:'fgh',
          name:'coo3',
        }].map(item=>(
        <Grid item xs={12} sm={6} md={4} >
          <div className="box" style={{ width: "100%", background:'red', textAlign:'center'}} >
            test
          </div>
        </Grid>
        ))}
      </Grid>
        <div>
          <h2>How to sell on DropOut Store?</h2>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
    </div>
  );
}

export default Home;
