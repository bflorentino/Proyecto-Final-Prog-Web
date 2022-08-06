import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { login, setLeftData } from '../actions/auth-actions'
import { authContext } from '../context/context'
import { auth } from '../firebase/config.firebase'
import AuthRouter from './AuthRouter'
import ItlamorRouter from './ItlamorRouter'

const AppRouter = () => {

  const { dispatch } = useContext(authContext);
  const [ isAuthChecking, setIsAuthChecking ] = useState(true);
  const [isAuthenticated, setIsAuntheticated ] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth){
        dispatch(login({uid:userAuth.uid, usuario: userAuth.displayName, photoURL: userAuth.photoURL}))
        setIsAuntheticated(true)
        dispatch(setLeftData(JSON.parse(window.localStorage.getItem("user Data"))))
      }else{
        setIsAuntheticated(false)
      }
      setIsAuthChecking(false)
    })
  }, [dispatch])

  return (
    isAuthChecking ?
    <h1>Cargando</h1>
      :(<Router >
        <div>
          <Routes>
            <Route 
              path = '/' 
              element = {<Navigate to="/itlamor/feed" />}
            />
            <Route 
              path = '/auth/*' 
              element = {!isAuthenticated ? <AuthRouter /> : <Navigate to="/itlamor/feed" />}
            />
            <Route  
              path = '/itlamor/*' 
              element = {<ItlamorRouter />} 
            />
          </Routes>
        </div>
      </Router>)
  )
}

export default AppRouter