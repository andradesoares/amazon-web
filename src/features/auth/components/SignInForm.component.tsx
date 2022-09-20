import React, { FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import useInput from '../../../hooks/input/use-input';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { signin, reset } from '../authSlice';
import { SigninUser } from '../models/SiginUser.interface';

const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    text: email,
    shouldDisplayError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    inputClearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    inputClearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/');
  }, [isAuthenticated]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;
    const user: SigninUser = {
      email,
      password,
    };

    dispatch(signin(user));

    clearForm();
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px', color: 'primary' }} />;

  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: '#cccccc',
          width: '350px',
          marginTop: 2,
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign in
            </Typography>
            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor="email">
              Your email
            </InputLabel>
            <TextField
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? 'Enter a valid email' : ''}
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />
            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor="password">
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? 'Enter your password' : ''}
              type="password"
              name="password"
              id="password"
              variant="outlined"
              size="small"
              placeholder="Minimun 6 characters required"
            />
            <Button
              variant="contained"
              style={{
                marginTop: '16px',
                height: '31px',
                backgroundColor: '#F0C14B',
                color: 'black',
                borderColor: '#A88734 #9C7E31 #846A29',
                textTransform: 'none',
              }}
              type="submit"
            >
              Sign in
            </Button>
          </Grid>
        </form>
        <div style={{ marginTop: '30px' }}>
          <small>
            <span>By continuing, you agree to Amazon's </span>
          </small>
        </div>
        <div>
          <small>
            <a href="#" style={{ textDecoration: 'none' }}>
              {' '}
              Conditions of use
            </a>{' '}
            and{' '}
            <a href="#" style={{ textDecoration: 'none' }}>
              Privacy policy
            </a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>New to amazon?</small>
        </Divider>
        <Link to="/signup" style={{ textDecoration: 'none', color: '#0000ee' }}>
          <Button
            variant="contained"
            style={{
              width: '100%',
              marginTop: '12px',
              height: '31px',
              backgroundColor: '#F1F1F1',
              color: 'black',
              textTransform: 'none',
            }}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInForm;
