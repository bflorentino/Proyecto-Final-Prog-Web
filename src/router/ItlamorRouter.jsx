import React, { useContext } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import FeedPage from '../components/feed/FeedPage'
import NavBar from '../components/navigation/NavBar'
import NewPostPage from '../components/posts/NewPostPage'
import { authContext } from '../context/context'

const ItlamorRouter = () => {

  const {auth} = useContext(authContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route 
          exact path = '/feed' 
          element={<FeedPage />} 
        />
        <Route 
          exact path = '/post' 
          element={auth.uid ? <NewPostPage /> : <Navigate to='/itlamor/feed' /> } 
        />
      </Routes>
    </>
  )
}

export default ItlamorRouter