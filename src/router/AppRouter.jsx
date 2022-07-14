import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import ItlamorRouter from './ItlamorRouter'

const AppRouter = () => {
  return (
    <Router >
      <div>
        <Routes> 

          <Route 
            path = '/auth/*' 
            element = {<AuthRouter />}
          />

          <Route  
            path = '/itlamor/*' 
            element = {<ItlamorRouter />} 
          />

        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter