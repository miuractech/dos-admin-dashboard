import { useState } from 'react';
import { string } from 'yup';
import styles from './home.module.css';

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
    <div className={styles['container']}>
      <input onChange={changed} type="text" placeholder='Company or Business name' />
      <button onClick={clicked}> Register Here For Selling</button>
    </div>
  );
}

export default Home;
