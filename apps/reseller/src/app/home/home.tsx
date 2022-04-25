import { Container } from '@mui/material';
import { useState } from 'react';
import './home.css';
import { RegistrationHome } from './homeInput';
import { StepsToSell } from './stepsTosell';

/* eslint-disable-next-line */
export interface HomeProps { }

export function Home(props: HomeProps) {

  const [storeName, setStoreName] = useState<string | null>(null)

  const clicked = () => {
    if(storeName){
      window.location.href = `/registration?storeName=${storeName?storeName:''}`
    }
  }

  const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value)
  }

  return (
    <Container maxWidth={false} style={{ padding: 0 }}  >
      <RegistrationHome changed={changed} clicked={clicked} storeName={storeName} />
      <StepsToSell />
    </Container>
  );
}

export default Home;