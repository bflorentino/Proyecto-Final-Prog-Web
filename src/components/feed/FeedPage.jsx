import React, { useContext } from 'react'
import { authContext } from '../../context/context'

const FeedPage = () => {

  const {auth} = useContext(authContext);
  console.log(auth)

  return (
    <div>FeedPage</div>
  )
}

export default FeedPage