import React from 'react'

const Post = ({post}) => {
  
  return (
    <>
        <div className='post__container'>
          {post.privacy === "public" 
            ? <div className='post__userFrom ml-2 mt-2'>
              <img src="../../assets/img/no-user-image.jpg" alt="" className='profile-img' />
               <p className='ml-2 bold'>{post.emailFrom}</p> 
              </div>  
            : <p className='ml-3 mt-2 bold'> Post Anonimo </p>    
          }

          <p className='ml-3 mt-2'>Para: {post.toWhom}</p>

          {
            post.image !== null && 
            <img src={post.image} alt="" className='post__image mt-2' />
          }
        
          { post.image !== null && post.privacy === "public" 
            ? 
              <p className='post__body'>
              <span className='bold'>  {post.emailFrom}: </span> 
                {post.body}
              </p>
            :
              <p className='post__body'>
                {post.body}
              </p>
            }    
      </div>
    </>
  )
}

export default Post