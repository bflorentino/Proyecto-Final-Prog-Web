import React, { useContext, useEffect, useState } from 'react'
import { authContext, profileContext } from '../../context/context'
import { getAll, getUsersFromPosts, getWithEqualQuery } from '../../services/post-services'
import Post from '../posts/Post'
import ProfileWindow from '../profile/ProfileWindow'

const FeedPage = () => {

  const [ posts, setPosts ] = useState([])
  const {auth} = useContext(authContext)
  const {profileInfo} = useContext(profileContext)

  useEffect(() => {

    // SI EL USUARIO HA INICIADO SESIÓN OBTIENE TODOS LOS POSTS.
    // SI EL USUARIO NO HA INICIADO SESIÓN SOLAMENTE OBTIENE LOS POSTS PÚBLICOS

    if(auth.uid){
      getAll("posts")
      .then(data => {
          getUsersFromPosts(data)
            .then(dPosts => {
              setPosts(dPosts)
            })
        })
      }
      else{
        getWithEqualQuery("posts", "privacy", "public")
        .then(data => {
          getUsersFromPosts(data).then(dPosts => {
            setPosts(dPosts)
          })
      })
    }
  }, [auth.uid,])

  return (
    <>
      <main className='sect__cont'>
      {profileInfo.open && 
          <ProfileWindow />
      }
       {
        posts.map((post, index) => (
          <Post 
            key= {index} 
            post={post} 
          />
        ))
       }
      </main>
    </>
  )
}

export default FeedPage