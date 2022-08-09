import React, { useContext} from 'react'
import { openProfile } from '../../actions/profile-actions';
import { profileContext } from '../../context/context'

const Post = ({post}) => {

  const {dispatchProfile} = useContext(profileContext);

  // OPEN MODAL WINDOW WHEN USER PICK OTHER
  const handleProfileWindow = (toUser) => {
    document.getElementById("portal").classList.toggle("modal__show-modal")
    dispatchProfile(openProfile(post, toUser))
  }

  return (
    <> 
        <div className='post__container'>

          <div className='post__header mt-2'>
          {post.privacy === "public" 
            ?
            <>
            <div className='post__userFrom'>
              <img 
                 src={post.profilePicOrigin ? post.profilePicOrigin : '../../assets/img/no-user-image.jpg'} 
                 alt="" 
                 className='profile-img' 
              />
               <p 
                className='ml-2 bold pointer' 
                onClick={() => handleProfileWindow("from")}
               >
                  {post.nameOrigin} {post.lastNameOrigin}</p> 
              </div>  
            </> 
               : 
               <h3 className='mt-2 bold'> Post Anonimo </h3>    
              }
              <p className='text-gray'>{post.date}</p> 
          </div>
          
          {
            !post.other
            ? 
              <p className='ml-3 mt-2 bold pointer' onClick={() =>handleProfileWindow("to")}>
                   Para: {post.nameTo} {post.lastNameTo}
              </p> 
            : 
              <p className='ml-3 mt-2'>Para: {post.toWhom}</p>
            }

          {
            post.image !== null && 
            <img src={post.image} alt="" className='post__image mt-2' />
          }
        
          { post.image !== null && post.privacy === "public" 
            ? 
              <p className='post__body'>
              <span className='bold'>  {post.nameOrigin} {post.lastNameOrigin}: </span> 
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