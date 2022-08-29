import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DisplayUser } from './models/DisplayUser.interface';
import { Jwt } from './models/Jwt';
import { NewUser } from './models/NewUser';
import authService from './services/auth.service';

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
  user: null,
  jwt: null,
  isAuthenticated: false,
};

export const signup = createAsyncThunk('auth/signup', async (user: NewUser, thunkAPI) => {
  try {
    return await authService.signup(user);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to register');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default authSlice.reducer;
