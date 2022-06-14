import './app.css';

import { Route, Link, Routes } from 'react-router-dom';
import { MiuracImage } from '@miurac/image-upload';
import { app, auth } from '../configs/firebaseConfig';
import Auth from '../features/auth/auth';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../features/auth/authSlice';
import { CircularProgress } from '@mui/material';
import Logout from '../features/auth/logout';


export function App() {
  const dispatch = useDispatch()
  const {loading} = useSelector((state: RootState) => state.User)
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred))
    })
    return () => Unsubscribe()

  }, [])
  if(loading) return <CircularProgress />
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/image-upload' element={<MiuracImage app={app} authComponent={<Auth/>} />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<>not found</>} />
      </Routes>
    </div>
  );
}

export default App;

