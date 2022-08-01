import React, { useReducer } from 'react'
import { authContext, postContext } from './context/context';
import { authentication } from './reducers/authentication';
import { posts } from './reducers/posts';
import AppRouter from './router/AppRouter';

const ItlamorApp = () => {

  const [ auth, dispatch ] = useReducer(authentication, {});
  const [ post, dispatchPosts ] = useReducer(posts, []);

  const authValues = {
    auth,
    dispatch
  }

  const postsValues = {
    post,
    dispatchPosts
  }
  

  return (
    <>
      <authContext.Provider value={authValues}>
      <postContext.Provider value={postsValues}>
        <AppRouter />
      </postContext.Provider>   
      </authContext.Provider>   
    </>
  )
}

export default ItlamorApp;