import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDetailState } from '../types'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../firebaseConfig/config';

export const auth = getAuth(app);

type userformDetails = {
  email: string
  fullName: string
  phone: string
  storeName: string
}

const initialState: UserDetailState = {
  userDetails: {
    email: "",
    fullName: "",
    phone: "",
    storeName: ""
  },
  loading: true,
  error: null,
  User: null
}

type createPayloadType = {
  email: string
  password: string
}

export const createUser = createAsyncThunk("User/createUser",
  async (payload: createPayloadType, { rejectWithValue }) => {
    await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential;
        return { user }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = rejectWithValue(error.message);
      })
  }
)

export const loginUser = createAsyncThunk("User/loginUser",
  async (payload: createPayloadType, { rejectWithValue }) => {
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential;
        return { user }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = rejectWithValue(error.message);
      });
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
    user: (state, action) => {
      state.User = action.payload
    }

  },
  extraReducers: {
    [createUser.pending.toString()]: (state, action) => {
      state.loading = true
    },
    [createUser.rejected.toString()]: (state, action) => {
      state.error = action.payload
    },
    [createUser.fulfilled.toString()]: (state, action) => {
      state.loading = false
      state.User = action.payload
    },
    [loginUser.fulfilled.toString()]: (state, action) => {
      state.loading = false
      state.User = action.payload
    },
  }
})

export const { submit, user } = UserSlice.actions

export default UserSlice.reducer