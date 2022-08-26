/* eslint-disable no-constant-condition */
import './app.css';
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import { app, auth, db } from '../configs/firebaseConfig';
import { lazy, Suspense, useEffect } from 'react';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../features/auth/authSlice';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  setBackDrop,
  setError,
  setNotification,
  setWarning,
} from '../store/alertslice';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { setCategory, setFamily, setSubCategory } from '../store/product';
import { ContactUs } from './components/contactUs/ContactUs';
import { Header } from './productPage/header/Header';
import { NavBar } from './components/Navbar/NavBar';
import { MobileHeader } from './components/MobileHeader';
import { HeaderTop } from './components/HeaderTop';
import { Cart } from './components/cart/Cart';
import {
  addCartProducts,
  localCart,
  setAddress,
  setLocalCart,
  setOrderId,
  setSelectedAddress,
  setSelectedAddressfull,
} from '../store/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { ShippingMethod } from './components/shippingMethod/ShippingMethod';
import { Cardbredcrum } from './components/cart/Cardbredcrum';
import { MyAccount } from './MyAccount/MyAccount';
import { OrderConfirmation } from './components/payment/OrderConfirmation';
import { Paymentsuccess } from './components/payment/Paymentsuccess';
import { Paymentfailuer } from './components/payment/Paymentfailuer';
import { Home } from './Home/Home';
import { CMI } from '../CMI/cmi';
import YourOders from './MyAccount/YourOders';
import Wishlist from './MyAccount/Wishlist';
const Auth = lazy(() => import('../features/auth/auth'));
const Logout = lazy(() => import('../features/auth/logout'));
const StoreFront = lazy(() => import('./storefront/storeFront'));
const ProductPage = lazy(() => import('./productPage/ProductPage'));
export function App() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.User);
  const { localCart, addresses } = useSelector(
    (state: RootState) => state.cart
  );
  const { error, notification, warning, backDrop } = useSelector(
    (state: RootState) => state.alerts
  );
  const location = useLocation();

  const getLocalData = () => {
    const data = localStorage.getItem('cart');
    if (!data) return;
    const cartData = JSON.parse(data);
    dispatch(setLocalCart(cartData));
    cartData.forEach(async (element: localCart) => {
      const docRef = doc(
        db,
        'reSellers',
        element.resellerId,
        'products',
        element.productID
      );
      const docSnap = await getDoc(docRef);
      dispatch(
        addCartProducts({
          product: docSnap.data(),
          size: element.size,
          count: element.count,
          id: element.id,
        })
      );
    });
  };

  const getData = async () => {
    try {
      const q = query(
        collection(db, 'meta', 'products', 'family'),
        where('status', '==', 'published'),
        orderBy('index', 'asc')
      );
      const querySnapshot = await getDocs(q);
      dispatch(
        setFamily(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
      const q2 = query(
        collection(db, 'meta', 'products', 'category'),
        where('status', '==', 'published'),
        orderBy('index', 'asc')
      );
      const querySnapshot2 = await getDocs(q2);
      dispatch(
        setCategory(
          querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
      const q3 = query(
        collection(db, 'meta', 'products', 'sub_category'),
        where('status', '==', 'published'),
        orderBy('index', 'asc')
      );
      const querySnapshot3 = await getDocs(q3);
      dispatch(
        setSubCategory(
          querySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    } catch (error) {
      dispatch(setError('Error getting data'));
    }
  };

  useEffect(() => {
    getorderid();
  }, [user]);

  const getorderid = async () => {
    if (!user) return;
    dispatch(setBackDrop(true));
    const docRef = doc(db, 'cart', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatch(setSelectedAddress(data['addressId']));
      dispatch(setOrderId(data['orderid']));
      dispatch(setSelectedAddressfull(data['address']));
      dispatch(setBackDrop(false));
    } else {
      dispatch(setBackDrop(false));
    }
  };

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred));
    });
    getLocalData();
    getData();
    return () => Unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const getAddress = async () => {
      const q = query(
        collection(db, 'users', user.uid, 'addresses'),
        orderBy('timeStamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      dispatch(
        setAddress(querySnapshot.docs.map((a) => ({ ...a.data(), id: a.id })))
      );
    };
    getAddress();
  }, [dispatch, user]);

  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.up('sm'));
  if (loading) return <CircularProgress />;
  return (
    <>
      <div>
        <Suspense
          fallback={
            <div className="flex w-screen h-screen justify-center align-middle">
              <CircularProgress />
            </div>
          }
        >
          <HeaderTop />
          {media ? (
            <>
              <Header />
              {location.pathname === '/cart' ? null : <NavBar />}
            </>
          ) : (
            <MobileHeader />
          )}
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/shops" element={<>shops</>} />
            <Route path="/success" element={<Paymentsuccess />} />
            <Route path="/failure" element={<Paymentfailuer />} />
            <Route path="/cart" element={<Cardbredcrum />}>
              <Route index element={<Cart />} />
              <Route path="cartt" element={<Cart />} />
              {user && (
                <>
                  <Route path="shippingmethod" element={<ShippingMethod />} />
                  <Route
                    path="orderconfirmation"
                    element={<OrderConfirmation />}
                  />
                </>
              )}
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/shops/:resellerid" element={<StoreFront />} />
            <Route
              path="/shops/:resellerid/products/:productid"
              element={<ProductPage />}
            />
            <Route path="/contact" element={<ContactUs />} />
            {user && (
              <>
                <Route path="myprofile" element={<MyAccount />} />

                <Route path="CMI" element={<CMI />} />
                <Route path="myprofile/your-order" element={<YourOders />} />
                <Route path="myprofile/wishlist" element={<Wishlist />} />
              </>
            )}
            <Route path="*" element={<>not found</>} />
          </Routes>
        </Suspense>
      </div>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={() => dispatch(setError(null))}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={5000}
        onClose={() => dispatch(setNotification(null))}
      >
        <Alert severity="success">{notification}</Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(warning)}
        autoHideDuration={5000}
        onClose={() => dispatch(setWarning(null))}
      >
        <Alert severity="warning">{warning}</Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
