// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.css';

import { Route, Link } from 'react-router-dom';
import InputField from '../UI/input-field/input-field';

export function App() {
  return (
    <div style={{ height:'100vh', backgroundColor:'#FBFAF8'}} className='margin2' >
      <InputField  />
    </div>
  );
}

export default App;
