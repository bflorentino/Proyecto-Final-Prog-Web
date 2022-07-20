import React, { useReducer } from 'react'
import { authContext } from './context/context';
import { authentication } from './reducers/authentication';
import AppRouter from './router/AppRouter';

const ItlamorApp = () => {

  const [ auth, dispatch ] = useReducer(authentication, {});

  const authValues = {
    auth,
    dispatch
  }

  return (
    <>
      <authContext.Provider value={authValues}>
        <AppRouter />
      </authContext.Provider>   
    </>
  )
}

export default ItlamorApp;
