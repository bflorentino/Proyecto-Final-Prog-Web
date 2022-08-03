import React from 'react'

const Post = ({post}) => {
  
  return (
    <>
        <div className='post__container'>
          {post.privacy === "public" 
            ? <div className='post__userFrom ml-2 mt-2'>
              <img src="../../assets/img/no-user-image.jpg" alt="" className='profile-img' />
               <p className='ml-2'>{post.emailFrom}</p> 
              </div>  
            : <p> Post Anonimo </p>    
          }

          <p className='ml-3 mt-2'>Para: {post.toWhom}</p>

          {
            post.image !== null && 
            <img src={post.image} alt="" className='post__image' />
          }
        
        <p>{post.body}</p>        
      </div>
    </>
  )
}

export default Post