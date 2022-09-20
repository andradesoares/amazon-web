import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { logout } from '../features/auth/authSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <h1>Home page</h1>
      <a
        onClick={logoutHandler}
        style={{
          backgroundColor: 'yellow',
          cursor: 'pointer',
          height: '40px',
          width: '60px',
          padding: '8px',
        }}
        href="/"
      >
        Logout
      </a>
      {user?.email}
    </div>
  );
};

export default HomePage;
