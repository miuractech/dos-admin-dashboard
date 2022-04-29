// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './homepage/homepage';
import { RootState } from '../redux-tool/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, auth } from '../redux-tool/auth';
import { CircularProgress } from '@mui/material';
import NewsLetter from './Auth/news-letter/news-letter';
import Home from './Auth/regHomePage/home';
import Registration from './Auth/registration/registration';
import RegistrationPassword from './Auth/confrimPassword/registration-password';
import Login from './Auth/loginpage/login';
import VerifyEmail from './Auth/verify-email/verify-email';

export function App() {
  const dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.User.User)
  const {loading} = useSelector((state: RootState) => state.User)
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (cred) => {
      dispatch(setUser(cred))
    })

    return () => Unsubscribe()

  }, [])
  
// console.log('app page',User);

if(loading) {
  return(
  <div className='flex justify-center vertical-center' style={{height:'100vh'}} >
    <CircularProgress />
  </div>
  )
}
else if(!User){
    return(
      <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup/*" element={<Registration/>} />
        <Route path="/signup" element={<Registration/>} />
        <Route path="/password" element={<RegistrationPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
      <NewsLetter />
    </>
      
    )
  }
else if(!User.emailVerified){
  return (
    <VerifyEmail />
  );
}
else if(User?.emailVerified){
  return (
    <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
  );
}
else{
  return(
    <>error 404</>
  )
}
}

export default App;
