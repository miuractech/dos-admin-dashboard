import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDetailState } from '../types'
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { app } from '../firebaseConfig/config';
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/config"

export const auth = getAuth(app);

const initialState: UserDetailState = {
  userDetails: {
    email: "",
    fullName: "",
    phone: "",
    storeName: ""
  },
  loading: true,
  error: null,
  User: undefined,
  notification: null,
  backDrop: false,
  Errorstring:null
}

type createPayloadType = {
  email: string
  password: string
  storeName: string
  phone: string
  fullName: string
}

export const createUser = createAsyncThunk("User/createUser",
  async (payload: createPayloadType, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      await setDoc(doc(db, "reSellers", response.user.uid), {
        phone: payload.phone,
        storeName: payload.storeName,
        fullName: payload.fullName
      })
      await sendEmailVerification(response.user)
      return { response }

    }
    catch (error: any) {
      const errorCode = error.code;
      console.log(errorCode);
      return rejectWithValue(error)
    }
  }
)
type loginPayloadType = {
  data: createPayloadType,
  onSuccess: any
}
export const loginUser = createAsyncThunk("User/loginUser",
  async (payload: loginPayloadType, { rejectWithValue }) => {
    try {

      const response = await signInWithEmailAndPassword(auth, payload.data.email, payload.data.password)
      return response.user
    }
    catch (error: any) {
      const errorCode = error.code;
      console.log(errorCode);
      console.log(error);
      return rejectWithValue(error)
    }
  }
)

export const logoutUser = createAsyncThunk("User/logoutUser",
  async () => {
    signOut(auth).then(() => {
      return null
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
)

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    submit: (state, action) => {
      state.userDetails = action.payload
    },
    setUser: (state, action) => {
      state.User = action.payload
      state.loading = false
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    setBackDrop: (state, action) => {
      state.backDrop = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setErrorString: (state, action) => {
      state.Errorstring = action.payload
    }
  },
  extraReducers: {
    [createUser.pending.toString()]: (state, action) => {
      state.loading = true
    },
    [createUser.rejected.toString()]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.Errorstring = action.payload.message
    },
    [createUser.fulfilled.toString()]: (state, action) => {
      state.loading = false

    },
    [loginUser.fulfilled.toString()]: (state, action) => {
      state.loading = false
      // console.log('action.payload',action.payload);
      // state.userDetails = action.payload.userData
      // state.error = action.payload.error
    },
    [loginUser.rejected.toString()]: (state, action) => {
      state.loading = false
      state.error = action.payload 
      if (action.payload.code !== "auth/multi-factor-auth-required") {
        state.Errorstring = action.payload.message 
      }
    },
    [loginUser.pending.toString()]: (state, action) => {
      state.loading = true
    },
  }
})

export const { setUser, submit, setNotification, setBackDrop, setError, setErrorString } = UserSlice.actions

export default UserSlice.reducer