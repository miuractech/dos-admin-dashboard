import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../redux-tool/auth';
import { useDispatch } from 'react-redux';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (cred) => {
            if (cred) {
                dispatch(user(cred))
                setLoading(false)
            } else {
                dispatch(user(cred))
                navigate("/login")
            }
        })

        return () => Unsubscribe()

    }, [])

    return !loading && children
}