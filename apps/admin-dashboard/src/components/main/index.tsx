import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useSubject } from 'rxf-rewrite/dist';
import { CMI } from '../Options/CMI';
import { Coupons } from '../Options/Coupons/Coupons';
import styles from './meta/styles/meta.module.scss';

import {
  selectedSideNavItem$,
  SideNavItemObject,
  sideNavToggled$,
} from './shared';
import SideNavBar from './sidenav';
import { Orders } from '../Options/orders/orders';
import { Products } from '../Options/products';
import { Merchants } from '../Options/merchents/merchents';
import { Customers } from '../Options/coustomers';
import { Meta } from '../Options/meta';
import { Logout } from '../Options/logout';
import { Fonts } from '../Options/CMI/fonts/fonts';
import { Art } from '../Options/CMI/art/art';
import { Location } from '../Options/Location/location';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAdminUserState } from '../../Midl/auth/store/admin.user.slice';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import Auth from '../../Midl/auth/component/auth';
import { seterror, setNotification, setWarning } from '../../store/alert';

const Main: React.FC = () => {
  useSubject(selectedSideNavItem$);
  useSubject(sideNavToggled$);
  const user = useSelector((state: RootState) => state.adminUser)
  const {backDrop,error,notification,warning} = useSelector((state: RootState) => state.alert)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      if(cred){
        if(cred.uid === 'GjQ5QmZcLoT926oYTMNnJtZLjSo1'){
          dispatch(setAdminUserState({
            user: cred,
            userLoading: false,
            error: "",
            signOutMessage: "",
          }))
        }else{
          dispatch(setAdminUserState({
            user: null,
            userLoading: false,
            error: "You're Not authorized",
            signOutMessage: "Unauthorized user",
          }))
        }
      }else{        
        dispatch(setAdminUserState({
          user: null,
          userLoading: false,
          error: "No user",
          signOutMessage: "No user",
        }))
      }
    })
    return () => Unsubscribe()
  }, [])
  
  if(user.user === undefined) return (<div style={{display:'flex', height:'100vh', width:'100vw', justifyContent:'center', alignItems:'center'}}>
    <CircularProgress />
  </div>)
  else if(user.user === null) return (<div style={{display:'flex', height:'100vh', width:'100vw', justifyContent:'center', alignItems:'center'}}>
  <Auth />
</div>)
  else{
    return (
      <>
        <SideNavBar />
        <div
          style={{
            marginLeft: sideNavToggled$.value ? 375 : 0,
            minWidth: 800,
            minHeight: 600,
            transition: 'all .5s ease-in-out',
          }}
        >
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/merchants" element={<Merchants />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/meta" element={<Meta />} />
            <Route path="/couponsgifts" element={<Coupons />} />
            <Route path="/cmi" element={<CMI />} >
              <Route index element={<Fonts />} />
              <Route path="/cmi/font" element={<Fonts />} />
              <Route path="/cmi/art" element={<Art />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/location" element={<Location />} />
          </Routes>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
            open={backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={() => dispatch(seterror(null))}>
            <Alert severity='error'>{error}</Alert>
          </Snackbar>
          <Snackbar open={Boolean(notification)} autoHideDuration={5000} onClose={() => dispatch(setNotification(null))}>
            <Alert severity='success'>{notification}</Alert>
          </Snackbar>
          <Snackbar open={Boolean(warning)} autoHideDuration={5000} onClose={() => dispatch(setWarning(null))}>
            <Alert severity='warning'>{warning}</Alert>
          </Snackbar>
        </div>
      </>
    );
  }
};

export default Main;
