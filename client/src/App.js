import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoginRecoveryPage from './pages/LoginRecoveryPage';
import UserProfilePage from './pages/UserProfile';
import { SearchPage } from './pages/SearchPage';
import setAuthToken from './utils/SetAuthToken';
import store from './store';
import { loadUser, logout } from './features/users/userSlice';

const App = () => {
  useEffect(() => {
    const token = localStorage.token || sessionStorage.token;
    if (token) {
      setAuthToken(token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token || !sessionStorage.token)
        store.dispatch(logout());
    });
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login-recovery' element={<LoginRecoveryPage />} />
      <Route path='/' element={<LandingPage />} exact />
      <Route path='/search' element={<SearchPage />} exact />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<UserProfilePage />} exact />
      </Route>
    </Routes>
  );
};

export default App;
