import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/context'
import { getAll, getUsersFromPosts, getWithEqualQuery } from '../../services/post-services'
import Post from '../posts/Post'

const FeedPage = () => {

  const [ posts, setPosts ] = useState([])
  const {auth} = useContext(authContext)

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
       {
        posts.map(post => (
          <Post key={post.image} post={post} />
        ))
       }
      </main>
    </>
  )
}

export default FeedPage