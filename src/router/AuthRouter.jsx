import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import RegistrationPage from '../components/auth/RegistrationPage';

const AuthRouter = () => {
  return (
    <Routes>
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/sign-up' element={<RegistrationPage />} />
  </Routes>
  )
}

export default AuthRouter