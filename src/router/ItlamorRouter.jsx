import React from 'react'
import {Route, Routes} from 'react-router-dom'
import FeedPage from '../components/feed/FeedPage'

const ItlamorRouter = () => {

  return (
    <Routes>
      <Route exact path = '/feed' element={<FeedPage />} />
    </Routes>
  )
}

export default ItlamorRouter