import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { DisplayUser } from './models/DisplayUser.interface';
import { Jwt } from './models/Jwt';
import { NewUser } from './models/NewUser';
import { SigninUser } from './models/SiginUser.interface';
import authService from './services/auth.service';

const storedUser: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJWT: string | null = localStorage.getItem('jwt');
const jwt: Jwt | null = !!storedJWT ? JSON.parse(storedJWT) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user,
  jwt,
  isAuthenticated: false,
};

export const signup = createAsyncThunk('auth/signup', async (user: NewUser, thunkAPI) => {
  try {
    return await authService.signup(user);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to register');
  }
});

export const signin = createAsyncThunk('auth/signin', async (user: SigninUser, thunkAPI) => {
  try {
    return await authService.signin(user);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to login');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const verifyJwt = createAsyncThunk('auth/verify-jwt', async (jwt: string, thunkAPI) => {
  try {
    return await authService.verifyJwt(jwt);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to verify');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //SIGNUP
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      //SIGNIN
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      //LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      //VERIFY_JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
