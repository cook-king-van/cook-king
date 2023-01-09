import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginRecoveryPage from './pages/LoginRecoveryPage';
import CreateRecipePage from './pages/CreateRecipePage';
import { SearchPage } from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import EditRecipePage from './pages/EditRecipePage';
import NotFoundPage from './pages/NotFoundPage';
import setAuthToken from './utils/SetAuthToken';
import store from './store';
import { loadUser, logout } from './features/users/userSlice';

const App = () => {
  useEffect(() => {
    const token = localStorage.token || sessionStorage.token;
    const isRemember = localStorage.remember;
    if (token) {
      setAuthToken(token, isRemember);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token || !sessionStorage.token)
        store.dispatch(logout());
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} exact />
      <Route path='/register' element={<RegisterPage />} exact />
      <Route path='/login-recovery' element={<LoginRecoveryPage />} exact />
      <Route path='/search' element={<SearchPage />} exact />
      <Route path='/recipe/:id' element={<RecipeDetailPage />} />
      <Route path='/404' element={<NotFoundPage />} exact />
      <Route path='/' element={<LandingPage />} exact />
      <Route path='*' element={<Navigate to='/404' replace />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<UserProfilePage />} exact />
        <Route path='/create-recipe' element={<CreateRecipePage />} exact />
        <Route path='/recipe/edit/:id' element={<EditRecipePage />} />
      </Route>
    </Routes>
  );
};

export default App;
