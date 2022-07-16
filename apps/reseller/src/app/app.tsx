// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RootState } from '../redux-tool/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { multiFactor, onAuthStateChanged } from 'firebase/auth';
import { setUser, auth, submit, setNotification } from '../redux-tool/auth';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import NewsLetter from './Auth/news-letter/news-letter';
import Home from './Auth/regHomePage/home';
import Registration from './Auth/registration/registration';
import RegistrationPassword from './Auth/confrimPassword/registration-password';
import Login from './Auth/loginpage/login';
import VerifyEmail from './Auth/verify-email/verify-email';
import { PasswordReset } from './Auth/loginpage/passwordReset';
import { app, db, } from '../firebaseConfig/config';
import { doc, getDoc } from "firebase/firestore";
import VerifyPhone from './Auth/verify-phone/verify-phone';
import StorefrontCreator from './storeFrontForm/storefrontCreator';
import Header from './sideNav/header'
import { setStoreInfo } from '../redux-tool/functions';
import { CustomMerchInterface } from './DesignProduct/cmi';
import { AddProduct } from './DesignProduct/AddProducts';
import { NewHeader } from './sideNav/navbar';
import { Products } from './Products/Products';
import { SalesView } from './Sales View/SalesView';
import { Payment } from './Payment/Payment';
import { Settings } from './Settings/Settings';
import { Support } from './Support/Support';
import { BankVerification } from './verification/BankVerification';
// import { Cart } from './cart/Cart';

export function App() {
  const dispatch = useDispatch()
  const { User, notification } = useSelector((state: RootState) => state.User)
  const { loading } = useSelector((state: RootState) => state.User)
  const { profileUrl, profileLoading } = useSelector((state: RootState) => state.condition)
  // signOut(getAuth(app))
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred))
      if (cred) {
        const docRef = doc(db, "reSellers", cred.uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data()
        if (!data) return
        dispatch(submit(data))
        if (data['profileUrl']) {
          dispatch(setStoreInfo(data['profileUrl']))
        } else dispatch(setStoreInfo(null))
      }
    })
    return () => Unsubscribe()
  }, [])
  let userMultiFactor: any[] = [];
  if (User) userMultiFactor = multiFactor(User).enrolledFactors
  if (loading) {
    return (
      <div className='flex justify-center vertical-center' style={{ height: '100vh' }}>
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
  if (profileLoading) {
    return (
      <div className='flex justify-center vertical-center' style={{ height: '100vh' }} >
        <CircularProgress />
      </div>
    )
  }
  else if (!profileUrl) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/editStore" element={<StorefrontCreator />} />
          <Route path='*' element={<Navigate to='/editStore' replace />} />
        </Routes>
      </>
    );
  }
  else if (profileUrl) {
    return (
      <>
        <NewHeader>
          <Routes>
            <Route path='/designproduct/addproducts' element={<AddProduct />} />
            <Route path="/designproduct" element={<CustomMerchInterface />} />
            <Route path='/products' element={<Products />} />
            <Route path="/editStore" element={<StorefrontCreator />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/support' element={<Support />} />
            <Route path='/bankverification' element={<BankVerification />} />
            <Route path='/' element={<SalesView />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </NewHeader>
        {/* <Footer /> */}
        <Snackbar open={Boolean(notification)} autoHideDuration={5000} onClose={() => dispatch(setNotification(null))}>
          <Alert severity='success'>{notification}</Alert>
        </Snackbar>
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