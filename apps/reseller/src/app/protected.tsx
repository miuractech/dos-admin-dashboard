import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-tool/store';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();

    const User = useSelector((state: RootState) => state.User.User)
    const loading = useSelector((state: RootState) => state.User.loading)

    console.log(User);

    //checking if user is authorized, if not redirecting back to login page


    useEffect(() => {
        if (User==null) {
            navigate("/home")
        }
    }, [])



    return !loading && children
}