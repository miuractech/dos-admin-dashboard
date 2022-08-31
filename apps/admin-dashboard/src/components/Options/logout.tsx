import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../../config/firebase.config'

export const Logout = () => {

useEffect(() => {
    signOut(auth)
}, [])


    return (
        <div>
        </div>
    )
}
