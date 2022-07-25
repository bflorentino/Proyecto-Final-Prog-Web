import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth-actions';
import { authContext } from '../../context/context'
import { logoutFirebase } from '../../services/auth-services';

const FeedPage = () => {

  const history = useNavigate();
  const {dispatch} = useContext(authContext)

  const handleLogout = () => {

    logoutFirebase()
    .then(out => {
      dispatch(logout())
      history('/auth/login')
    })
  }

  return (
    <>
      <div>FeedPage</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default FeedPage