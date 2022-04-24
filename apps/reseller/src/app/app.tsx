// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes } from 'react-router-dom';
import Home from './home/home';
import Registration1 from './registration1/registration1';

export function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/registration" element={<Registration1 />} />
      </Routes>
    </div>
  );
}

export default App;
