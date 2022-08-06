import React, { useReducer } from 'react'
import { authContext, postContext, profileContext } from './context/context';
import { authentication } from './reducers/authentication';
import { posts } from './reducers/posts';
import { profile } from './reducers/profile';
import AppRouter from './router/AppRouter';

const ItlamorApp = () => {

  const [ auth, dispatch ] = useReducer(authentication, {});
  const [ post, dispatchPosts ] = useReducer(posts, []);
  const [ profileInfo, dispatchProfile ] = useReducer(profile, {open: false});

  const authValues = {
    auth,
    dispatch
  }

  const postsValues = {
    post,
    dispatchPosts
  }
  
  const profileValues = {
    profileInfo,
    dispatchProfile
  }
  

  return (
    <>
      <authContext.Provider value={authValues}>
      <postContext.Provider value={postsValues}>
      <profileContext.Provider value={profileValues}>
        <AppRouter />
      </profileContext.Provider>   
      </postContext.Provider>
      </authContext.Provider>   
    </>
  )
}

export default ItlamorApp;