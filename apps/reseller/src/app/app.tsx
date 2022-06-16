// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { StoreFront } from './homepage/storeFrontInitial';
import { RootState } from '../redux-tool/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { multiFactor, onAuthStateChanged } from 'firebase/auth';
import { setUser, auth, submit } from '../redux-tool/auth';
import { CircularProgress } from '@mui/material';
import NewsLetter from './Auth/news-letter/news-letter';
import Home from './Auth/regHomePage/home';
import Registration from './Auth/registration/registration';
import RegistrationPassword from './Auth/confrimPassword/registration-password';
import Login from './Auth/loginpage/login';
import VerifyEmail from './Auth/verify-email/verify-email';
import { PasswordReset } from './Auth/loginpage/passwordReset';
import { db } from '../firebaseConfig/config';
import { doc, getDoc } from "firebase/firestore";
import VerifyPhone from './Auth/verify-phone/verify-phone';
import StorefrontCreator from './homepage/storefrontCreator';
import Header from './components/header';

export function App() {
  const dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.User.User)
  const { loading } = useSelector((state: RootState) => state.User)

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred))
      if (cred) {
        const docRef = doc(db, "reSellers", cred.uid);
        const docSnap = await (await getDoc(docRef)).data()
        dispatch(submit(docSnap))
      }
    })

    return () => Unsubscribe()

  }, [])
  let userMultiFactor: any[] = [];
  if (User) userMultiFactor = multiFactor(User).enrolledFactors
  if (loading) {
    return (
      <div className='flex justify-center vertical-center' style={{ height: '100vh' }} >
        <CircularProgress />
      </div>
    )
  }
  else if (!User) {
    return (
      <>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup/*" element={<Registration />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/password" element={<RegistrationPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path='/password_reset' element={<PasswordReset />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
        <NewsLetter />
      </>

    )
  }
  else if (!User.emailVerified) {
    return (
      <VerifyEmail />
    );
  }
  else if (userMultiFactor && userMultiFactor.length === 0) {
    return (
      <VerifyPhone />
    )
  }
  else if (User?.emailVerified && userMultiFactor.length > 0) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/home" element={<StorefrontCreator />} />
          <Route path="/homeold" element={<StoreFront />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </>
    );
  }
  else {
    return (
      <>error 404</>
    )
  }
}

export default App;
