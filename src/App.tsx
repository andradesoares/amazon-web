import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './shared/utils/theme';
import HomePage from './pages/Home.page';
import SingInPage from './pages/SingIn.page';
import SingUpPage from './pages/SingUp.page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
