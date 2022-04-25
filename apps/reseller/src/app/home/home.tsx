import { Container } from '@mui/material';
import { useState } from 'react';
import './home.css';
import { RegistrationHome } from './homeInput';
import { Newletter } from './newletter';
import { StepsToSell } from './stepsTosell';

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
    <Container maxWidth={false} style={{ padding: 0 }}  >
      <RegistrationHome changed={changed} clicked={clicked} />
      <StepsToSell />
      <Newletter />
    </Container>
  );
}

export default Home;