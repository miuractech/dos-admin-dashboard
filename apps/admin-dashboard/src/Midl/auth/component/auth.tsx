import { Button, CircularProgress } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';

const provider = new GoogleAuthProvider();
const auth = getAuth();
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function Auth({}: Props) {
    const [loadingFlag, setLoading] = useState(false)
  return (
    <Button 
    variant='contained' 
    color='primary'
    onClick={()=>{
        setLoading(true)
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
        //   const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setLoading(false)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setLoading(false)
          // ...
        })
    }}
    >
        {loadingFlag?<CircularProgress color='inherit' />:'DOS Admin Auth'}
    </Button>
  )
}