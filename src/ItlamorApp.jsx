import React, { useReducer } from 'react'
import { authContext, profileContext } from './context/context';
import { authentication } from './reducers/authentication';
import { profile } from './reducers/profile';
import AppRouter from './router/AppRouter';

const ItlamorApp = () => {

  const [ auth, dispatch ] = useReducer(authentication, {});
  const [ profileInfo, dispatchProfile ] = useReducer(profile, {open: false});

  const authValues = {
    auth,
    dispatch
  }

  const profileValues = {
    profileInfo,
    dispatchProfile
  }

  return (
    <>
      <authContext.Provider value={authValues}>
      <profileContext.Provider value={profileValues}>
        <AppRouter />
      </profileContext.Provider>   
      </authContext.Provider>   
    </>
  )
}

export default ItlamorApp;