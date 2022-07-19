import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import RegistrationPage from '../components/auth/RegistrationPage';

const AuthRouter = () => {
  return (
    <main className='authentication__main'>
          <Routes>
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/sign-up' element={<RegistrationPage />} />
         </Routes>
    </main>
  )
}

export default AuthRouter