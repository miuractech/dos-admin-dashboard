import './app.css';
import { Route, Link, Routes } from 'react-router-dom';
import { app, auth, db } from '../configs/firebaseConfig';
import { lazy, Suspense, useEffect } from 'react';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../features/auth/authSlice';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { setError, setNotification } from '../store/alertslice';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { setFamily } from '../store/product';
const Auth = lazy(() => import('../features/auth/auth'));
const Logout = lazy(() => import('../features/auth/logout'));
const StoreFront = lazy(() => import('./storefront/storeFront'));
const ProductPage = lazy(() => import('./productPage/ProductPage'));
export function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.User)
  const { error, notification } = useSelector((state: RootState) => state.alerts)
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred))
      const q = query(collection(db, "meta", "products", "family"), orderBy("index", "asc"));
      const querySnapshot = await getDocs(q)
      dispatch(setFamily(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
    })
    return () => Unsubscribe()

  }, [])
  if (loading) return <CircularProgress />
  return (
    <>
      <div>
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/shops' element={<>shops</>} />
            <Route path='/' element={<>home</>} />
            <Route path='/shops/:resellerid' element={<StoreFront />} />
            <Route path='/shops/:resellerid/products/:productid' element={<ProductPage />} />
            <Route path='*' element={<>not found</>} />
          </Routes>
        </Suspense>
      </div>
      <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={() => dispatch(setError(null))}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
      <Snackbar open={Boolean(notification)} autoHideDuration={5000} onClose={() => dispatch(setNotification(null))}>
        <Alert severity='success'>{notification}</Alert>
      </Snackbar>
    </>
  );
}

export default App;

