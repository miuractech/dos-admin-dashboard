import { Button, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-tool/auth';
import './homepage.css';
import { RootState } from '../../redux-tool/store';
import { auth } from '../../redux-tool/auth';
import { multiFactor, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier, PhoneMultiFactorGenerator, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import { app, db } from '../../firebaseConfig/config';
import { doc, getDoc } from "firebase/firestore";
import CMI from "../../../../../libs/cmi/src/index"
/* eslint-disable-next-line */
export interface HomepageProps { }

export function Homepage(props: HomepageProps) {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  if (auth.currentUser) {
    console.log(multiFactor(auth.currentUser).enrolledFactors);
    console.log(auth.currentUser);
  }


  return (
    <div style={{ textAlign: "center" }}>
      <h1>logged in</h1>
      <Button
        onClick={logout}
        variant='contained' color='primary'>Log Out</Button>
      <CMI />
    </div>
  );
}

export default Homepage;
