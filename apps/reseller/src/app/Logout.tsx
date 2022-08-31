import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../firebaseConfig/config'

export const Logout = () => {
    useEffect(() => {
        signOut(auth)
    }, [])
    return (
        <div></div>
    )
}
