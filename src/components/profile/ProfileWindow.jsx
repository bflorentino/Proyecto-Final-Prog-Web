import React, { useContext } from 'react'
import { Portal } from 'react-portal'
import { closeProfile } from '../../actions/profile-actions'
import { profileContext } from '../../context/context'

const ProfileWindow = () => {

    const profileCont = useContext(profileContext)
    const {profileInfo} = profileCont
  
    const closeModal = () => {
        document.getElementById("portal").classList.toggle("modal__show-modal")
        profileCont.dispatchProfile(closeProfile())
    }

    return (
    <Portal node={document && document.getElementById("portal")}>

        <div className='modal__content'>
            <button className='btn modal__close pointer' onClick={closeModal}>
                        x
            </button>

            <h2 className='text-center'>Usuario</h2>
            <div className='profileWindow__data'>
                <img 
                    src={profileInfo.profilePicOrigin ? profileInfo.profilePicOrigin : '../../assets/img/no-user-image.jpg'} 
                    alt="" 
                    className='profile-img profileWindow__img' 
                    />
                    <div className='ml-3'>
                        <h3>{profileInfo.nameOrigin} {profileInfo.lastNameOrigin}</h3>
                        <p className='mt-1'>{profileInfo.careerOrigin}</p>
                    </div>
            </div>
        </div>

    </Portal>
  )
}

export default ProfileWindow