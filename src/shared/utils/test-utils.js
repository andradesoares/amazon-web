import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from '../../features/auth/authSlice';

function reducer(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authReducer }, preloadedState }),
    ...renderOpitions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { Wrapper, ...renderOpitions });
}

export * from '@testing-library/react';
export { reducer };
