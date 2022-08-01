import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext, postContext } from '../../context/context';
import { useForm } from '../../hooks/useForm';
import { addImage, addNewPost, getAllUsers } from '../../services/post-services';
import { validatePostUpload } from '../../validations/validations';

const NewPostPage = () => {

  const [ image, setImage ] = useState(null);
  const [ readedImage, setReadedImage ] = useState(null);
  const [ users, setUsers ] = useState([])
  const history = useNavigate()

  const [ error, setError ] = useState({
    responsibleInput: null,
    message: null
  });

  const { message, responsibleInput} = error;

  const [ formValues, handleInputChanges ] = useForm({
    privacy : "public",
    toWhom: "", 
    visibility : "public",
    body : ""
  })

  const {auth} = useContext(authContext)

  useEffect(() => {
    getAllUsers()
      .then(data => {
        setUsers(data.filter(user => user.email !== auth.email))
    })
  }, [auth.email])

  const imageHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      reader.readyState === 2 && setImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);
    setReadedImage(e.target.files[0])
  }

  const postSubmit = (e) => {
    
    e.preventDefault();
    const isValid = validatePostUpload(formValues.toWhom, formValues.body)

    if(isValid === true){

      setError({
        message:null,
        responsibleInput:null
      })

      const postToUpload = {
        ...formValues,
        postFrom: `${auth.nombre} ${auth.apellido}`,
        emailFrom: auth.email
      }
  
      addImage(readedImage)
      .then(data => {
          addNewPost({...postToUpload, image: data})
          history('/itlamor/feed')
      })
    }else{
      setError({
        message:isValid[0],
        responsibleInput:isValid[1]
      })
    }
  }
 
  return (
    <section className='FormPost__cont' >
      
      <form className='FormPost__form' onSubmit={postSubmit}>

        <div className='FormPost__dataCont styled-scroll'>     

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
              <img src='../../assets/img/no-user-image.jpg' className='profile-img' alt='' /> 
            </div>
            <div className='FormPost__fieldInp'>
              <h1>{auth.nombre} {auth.apellido}</h1>
            </div>
          </div>

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
              <h3 className='FormPost__h3'>Identidad en la declaración</h3> 
            </div>
            <div className='FormPost__fieldInp'>
              <div>
                <input 
                  type="radio" 
                  checked = {formValues.privacy === "public"}
                  value="public" 
                  name='privacy' 
                  id='public' 
                  onChange={handleInputChanges}  
                />
                <label htmlFor="anonimous" className='FormPost__label'>Pública</label>
              </div>

              <div>
                <input 
                  type="radio" 
                  value="anonimous"
                  checked = {formValues.privacy === "anonimous"}
                  name='privacy' 
                  id='anonimous' 
                  onChange={handleInputChanges}
                />
                <label htmlFor="public" className='FormPost__label'>Anónimo</label>
              </div>
            </div>
          </div>

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
              <h3 className='FormPost__h3'>Destinatario</h3>
            </div>
            <div className='FormPost__fieldInp'>
              <select name="toWhom" onChange={handleInputChanges} className='FormPost__input'>
                <option value="" defaultValue>Seleccionar</option>
                {
                  users.map((user, i) => 
                  ( <option key={i} value= {`${user.nombre} ${user.apellido}`} >
                      {user.nombre} {user.apellido}  
                    </option>
                  ))
                }
              </select>
              {
              (message && responsibleInput === 0) && 
              (
                <p className='text-red w-full mt-1 ml-5'>
                  {message}
                </p>
              )
            }
            </div>
          </div>

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
              <h3 className='FormPost__h3'>Visibilidad</h3> 
            </div>

            <div className='FormPost__fieldInp'>
              <div>
                <input 
                  type="radio" 
                  checked = {formValues.visibility === "public"}
                  value="public" 
                  name='visibility' 
                  id='pub' 
                  onChange={handleInputChanges} 
                />
                <label htmlFor="pub" className='FormPost__label'>Público</label>
              </div>
              <div>
                <input 
                  type="radio"
                  checked = {formValues.visibility === "private"}
                  value="private"
                   name='visibility' 
                   id='priv'
                  onChange={handleInputChanges} 
                />
                <label htmlFor="priv" className='FormPost__label'>Privado</label>
              </div>
            </div>
          </div>

          <div className='FormPost__fieldCont'>

            <div className='FormPost__fieldTitle'>
              <h3 className='FormPost__h3'>Contenido de la declaración</h3> 
            </div>

            <div className='FormPost__fieldInp'>
                <textarea 
                  placeholder='Contenido de la declaracion' 
                  name='body'
                  value={formValues.body} 
                  onChange={handleInputChanges} 
                  className='FormPost__textarea no-scrollbar'
                />
                {
                  (message && responsibleInput === 1) && 
                  (
                    <p className='text-red w-full mt-1 ml-5'>
                      {message}
                    </p>
                  )
                }
            </div>
          </div>

          {
            image && <img src={image} alt="" className='normal-img' />
          }
        </div>

        <div className='FormPost__submit'>

          {
            !image ? ( <label className='text-gray pointer FormPost__upload'>
            <input 
              type="file"
              name='profPicture'
              accept='image/*'
              className=' none'
              onChange={imageHandler}
            />
            <img src="../../assets/img/image_gallery.png" alt="" className='img-icon' />
            Adjuntar imagen
          </label>)
          : 
          (
              <button 
                className='btn text-gray pointer FormPost__upload' 
                onClick={(e)=> setImage(null)}
              >
                <img src="../../assets/img/remove.png" alt="" className='img-icon' />
                Remover
              </button>
            ) 
          }

          <button className ='btn btn-primary'>Publicar</button>
        </div>
      </form>
    </section>
  )
}

export default NewPostPage