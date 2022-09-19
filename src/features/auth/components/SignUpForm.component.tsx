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
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import { NewUser } from '../models/NewUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { signup, reset } from '../authSlice';

const SingUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    text: name,
    shouldDisplayError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputClearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputClearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/signin');
    }
  }, []);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    if (nameHasError || emailHasError || passwordHasError || confirmPasswordHasError) return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: NewUser = {
      name,
      email,
      password,
    };

    dispatch(signup(newUser));
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px', color: 'primary' }} />;

  return (
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
            Create Account
          </Typography>
          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor="name">
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? 'Enter your name' : ''}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />
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
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={passwordHasError ? 'Passwords must match' : ''}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
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
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: '30px' }}>
        <small>
          <span>By creating an account, you agree to Amazon's </span>
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
      <Divider sx={{ marginTop: '36px', marginBottom: '36px' }} />
      <div>
        <small>
          Already have an account?{' '}
          <Link to="/signin" style={{ textDecoration: 'none', color: '#0000ee' }}>
            Sign In
          </Link>
        </small>
      </div>
      <div>
        <small>
          Buying for work?
          <a href="#" style={{ textDecoration: 'none' }}>
            {' '}
            Create a free business account
          </a>{' '}
        </small>
      </div>
    </Box>
  );
};

export default SingUpForm;
