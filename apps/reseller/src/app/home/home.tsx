import { Button, Card, Container, Grid, Typography } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
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
    <Container maxWidth={false} style={{padding:0}}  >
        <RegistrationHome changed={changed} clicked={clicked} />
        <StepsToSell />
    </Container>
  );
}

export default Home;

interface RegistrationHomeProps {
  changed:ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  clicked:React.MouseEventHandler<HTMLButtonElement>;
}

const RegistrationHome = ({changed,clicked}:RegistrationHomeProps) =>{
  return(
    <div className="main" >
    <div className='center'>
      <h1>Register With Us!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis sit lectus ut <br />ullamcorper enim, ullamcorpe.</p>
      <Grid container spacing={1} >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
            <InputField fullWidth onChange={changed} type="text" placeholder='Company or Business name' color='primary' />
          </Grid>
          <Grid item xs={12} md={12} lg={4} xl={3}>
            <Button variant='contained' color='primary' fullWidth onClick={clicked} style={{height:56}} > Register Here For Selling</Button>
          </Grid>
      </Grid>
    </div>
  </div >
  )
}

const StepsToSell = () => {
  return(
    <div>
      <h2>How to sell on DropOut Store?</h2>
      <Grid container spacing={2} justifyContent="center">
        {[{
          num: "01",
          title:'Add Busniess Name',
          discripton:'By adding business name get register yourself',
        }, 
          {
          num: "02",
          title:'Create Seller Account',
          discripton:'Fill all details which are needed for registration',
        },
          {
          num:"03",
          title:'Add & Sell Products',
          discripton:'After sign up add your product as per your choice to sell',
        }].map(item=>(
        <Grid item xs={12} sm={6} md={6} lg={4} >
          <Card 
          variant='outlined'
          style={{ width: "100%",textAlign:'center', backgroundColor:'#FBFBFB'}} 
          >
            <div
            style={{padding:16}}
            >
              <Typography variant='h6' color={'secondary'} style={{fontWeight: 600,fontSize: '24px'}} textAlign='left' >{item.num}</Typography>
              <h3>{item.title}</h3>
              <p style={{textAlign:'center'}}>{ item.discripton}</p>
            </div>
          </Card>
        </Grid>
        ))}
      </Grid>
    </div>
  )
}