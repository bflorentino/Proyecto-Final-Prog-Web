import React, { useContext, useEffect, useRef, useState } from 'react'
import { authContext, profileContext } from '../../context/context'
import { getAll, getUsersFromPosts, getWithEqualQuery } from '../../services/post-services'
import Post from '../posts/Post'
import ProfileWindow from '../profile/ProfileWindow'

const FeedPage = () => {

  const [ posts, setPosts ] = useState([])
  const {auth} = useContext(authContext)
  const {profileInfo} = useContext(profileContext)
  const [ postsToShow, setPostsToShow ] = useState([])
  const [ postsToShowParam, setPostsToShowParam ] = useState("all")
  const rendered = useRef(false)

  useEffect(() => {

    // SI EL USUARIO HA INICIADO SESIÓN OBTIENE TODOS LOS POSTS.
    // SI EL USUARIO NO HA INICIADO SESIÓN SOLAMENTE OBTIENE LOS POSTS PÚBLICOS

    if(auth.uid){
      getAll("posts")
      .then(data => {
          getUsersFromPosts(data)
            .then(dPosts => {
              setPosts(dPosts)
              setPostsToShow(dPosts)
            })
          })
        }
        else{
          getWithEqualQuery("posts", "privacy", "public")
          .then(data => {
            getUsersFromPosts(data).then(dPosts => {
              setPosts(dPosts)
              setPostsToShow(dPosts)
          })
      })
    }
  }, [auth.uid,])

  useEffect(()=> {

    if(rendered.current){
      let postsFiltered;
    
      if(postsToShowParam=== "all"){
        postsFiltered = posts
      }
      
      else if(postsToShowParam === "mine"){
        postsFiltered = posts.filter(post => post.emailFrom === auth.email)
      }
    
      else{
        postsFiltered = posts.filter(post=> post.toWhom === auth.email)
      } 
  
      setPostsToShow(postsFiltered)
    }else{
      rendered.current = true
    }

  }, [postsToShowParam, auth.email, posts])

  const handleOnChange = (e) => {
    setPostsToShowParam(e.target.value)
  }

  return (
    <>
      <main className='sect__cont'>
      
      {profileInfo.open && 
            <ProfileWindow />
      }
      
      {
        posts.length > 0
        ?
          auth.uid &&
        <>
            <div className='post__filter'>
            <input 
              type="radio" 
              name='postToShow' 
              id='all' 
              value='all' 
              onChange={handleOnChange}
              checked={postsToShowParam === "all"}  
              />
            <label htmlFor="all" className='ml-1' >Todas</label>
            
            <input 
              type="radio" 
              name='postToShow' 
              id='mine'
              value='mine' 
              onChange={handleOnChange}
              checked={postsToShowParam === "mine"}
              className='ml-2'  
              />
            <label htmlFor="mine" className='ml-1' >Hechas por mi</label>
            
            <input 
              type="radio" 
              name='postToShow' 
              id='forMe' 
              value='forMe' 
              onChange={handleOnChange}
              checked={postsToShowParam === "forMe"}
              className='ml-2'     
              />
            
            <label htmlFor="forMe" className='ml-1' >Para mi</label>
          </div>
          
           {
             postsToShow.map((post, index) => (
               <Post 
               key= {index} 
               post={post} 
               />
               ))
            }
          </>

        : <h3>No hay posts para visualizar</h3>
      }


      </main>
    </>
  ) 
}

export default FeedPage