import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoginRecoveryPage from './pages/LoginRecoveryPage';
import UserProfilePage from './pages/UserProfile';
import { SearchPage } from './pages/SearchPage';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login-recovery' element={<LoginRecoveryPage />} />
      <Route element={<PrivateRoute />}>
      <Route path='/' element={<LandingPage />} exact />
      <Route path='/search' element={<SearchPage />} exact />
        <Route path='/profile' element={<UserProfilePage />} exact />
      </Route>
    </Routes>
  );
};

export default App;
