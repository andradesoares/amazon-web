import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './shared/utils/theme';
import HomePage from './pages/Home.page';
import SingInPage from './pages/SingIn.page';
import SingUpPage from './pages/SingUp.page';
import Private from './features/auth/components/Private';
import CartPage from './pages/Cart.page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Private page={<HomePage />} />} />
          <Route path="/cart" element={<Private page={<CartPage />} />} />
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
