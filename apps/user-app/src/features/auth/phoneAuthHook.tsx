import { logEvent } from 'firebase/analytics';
import { FirebaseApp, FirebaseError } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { analytics } from '../../configs/firebaseConfig';
import { setBackDrop } from '../../store/alertslice';
import { removeUserError, removeUserLoading, setPhone, setStep, setUser, setUserError, setUserLoading } from './authSlice';

type stepType = 'phone' | 'otp'

export default function usePhoneAuth(app: FirebaseApp, redirectUrl?: string): { sendOtp: (phone: string) => void, verifyOtp: (otp: string) => void, logout: () => void } {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!window.recaptchaVerifier) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
            }, auth);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
        }

        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            window.recaptchaVerifier = null
        }
    }, [])
    const sendOtp = async (phone: string) => {
        try {
            dispatch(setBackDrop(true))
            // dispatch(setUserLoading())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            window.confirmationResult = confirmationResult;
            dispatch(removeUserError())
            dispatch(removeUserLoading())
            dispatch(setStep("otp"))
            dispatch(setPhone(phone))
            dispatch(setBackDrop(false))
        } catch (error) {
            dispatch(setUserError(error))
            console.log("Error",error);
        }


    }
    const verifyOtp = (code: string) => {
        // dispatch(setUserLoading())
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            dispatch(setUser(user))
            window.location.href = redirectUrl ?? '/' // code translation :  redirectUrl??'/' =  redirectUrl?redirectUrl:'/'
        }).catch((error: FirebaseError) => {
            dispatch(setUserError(error))
        });
    }

    const logout = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
            // logEvent(analytics,'user-logged-out')
        }).catch((error) => {
            dispatch(setUserError(error))
        });
    }

    return { sendOtp, verifyOtp, logout }
}