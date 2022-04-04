import React from 'react';
import { useDispatch } from 'react-redux';
import ApplicationErrorHandler from 'rxf-rewrite/dist/errors/error-handler';
import { from } from 'rxjs';

import { setAdminUserState } from '../store/admin.user.slice';
import firebaseAuth from './auth-instance';

export default function useGoogleSignIn(mounted: boolean) {
  const dispatch = useDispatch();
  const [loadingFlag, setLoadingFlag] = React.useState(false);

  function googleSignIn() {
    setLoadingFlag(true);
    const obs$ = from(firebaseAuth.firebaseGoogleSignIn());
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler) {
        dispatch(
          setAdminUserState({
            user: null,
            userLoading: false,
            error: res.errorObject.message,
            signOutMessage: '',
          })
        );
      } else {
        dispatch(
          setAdminUserState({
            user: res,
            userLoading: false,
            error: '',
            signOutMessage: '',
          })
        );
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, googleSignIn };
}
