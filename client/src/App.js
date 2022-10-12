import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoginRecoveryPage from './pages/LoginRecoveryPage';
import UserprofilePage from './pages/UserProfile';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login-recovery' element={<LoginRecoveryPage />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/profile' element={<UserprofilePage />} />
    </Routes>
  );
};

export default App;
