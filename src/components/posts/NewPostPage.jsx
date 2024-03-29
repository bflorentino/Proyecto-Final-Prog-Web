import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/context';
import { useForm } from '../../hooks/useForm';
import { addImage, addNewPost, getAll } from '../../services/post-services';
import { validatePostUpload } from '../../validations/validations';
import Other from './Other';

// COMPONENTE FORMULARIO PARA LA CREACIÓN DE UN POST DE DECLARACIÓN (SOLO PARA LOGEADOS)
const NewPostPage = () => {

  const [ image, setImage ] = useState(null);
  const [ readedImage, setReadedImage ] = useState(null);
  const [ users, setUsers ] = useState([])
  const [ isOtherOpen, setIsOtherOpen ] = useState(false);
  
  const [ error, setError ] = useState({
    responsibleInput: null,
    message: null
  });
  
  const { message, responsibleInput} = error;
  const {auth} = useContext(authContext)
  const history = useNavigate()
  
  const [ formValues, handleInputChanges, setFormValues ] = useForm({
    privacy : "public",
    toWhom: "", 
    visibility : "public",
    body : ""
  })
  
// OBTENER LOS USUARIOS DE FIREBASE PARA DESPLEGARLOS EN EL DROPDOWN DE USUARIOS
  useEffect(() => {
    getAll("users")
      .then(data => {
        setUsers(data.filter(user => user.email !== auth.email))
    })
  }, [auth.email])

// IMAGE HANDLER  
  const imageHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      reader.readyState === 2 && setImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);
    setReadedImage(e.target.files[0])
  }

// ABRIR VENTANA MODAL CUANDO EL USUARIO SELECCIONE OTRO
const handleOther = (e) => {

  document.getElementById("portal").classList.toggle("modal__show-modal")
  setIsOtherOpen(true)

  e.preventDefault();
}

// SUBMIT POST DE DECLARACION
  const postSubmit = (e) => {
    
    e.preventDefault()

    let other = false
    const isValid = validatePostUpload(formValues.toWhom, formValues.body)

    if(isValid === true){

      setError({
        message:null,
        responsibleInput:null
      })

      if(formValues.toWhom.split(" ").length > 1){
          other = true;
      }  

      const postToUpload = {
        ...formValues,
        postFrom: `${auth.nombre} ${auth.apellido}`,
        emailFrom: auth.email,
        date: new Date().toLocaleDateString(),
        other
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
    <section className='FormPost__cont'>

     {isOtherOpen && 
        <Other 
          setIsOtherOpen={setIsOtherOpen} 
          setFormValues={setFormValues}
          formValues={formValues}
        />
    } 
      <form className='FormPost__form' onSubmit={postSubmit}>

        <div className='FormPost__dataCont styled-scroll'>     

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
            </div>
            <div className='FormPost__fieldInp' style={{display: 'flex', 'flexDirection': 'row'}}>
            <img 
                src={auth.photoURL? auth.photoURL : '../../assets/img/no-user-image.jpg'} 
                className='profile-img'
                alt='' 
              /> 
              <h1 className='ml-3'>{auth.nombre} {auth.apellido}</h1>
            </div>
          </div>

          <div className='FormPost__fieldCont'>
            <div className='FormPost__fieldTitle'>
              <h3 className='FormPost__h3'>Identidad</h3> 
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
              <select id='dest' name="toWhom" onChange={handleInputChanges} className='FormPost__input'>
                <option value="" defaultValue>Seleccionar</option>
                {
                  users.map((user, i) => 
                  ( <option key={i} value= {`${user.email}`} >
                      {user.nombre} {user.apellido}  
                    </option>
                  ))
                }
              </select>
              <button 
                className='btn pointer text-left mt-1 FormPost__otherBtn'
                onClick={handleOther}  
              >
                Otro
              </button>
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
              <h3 className='FormPost__h3'>Contenido</h3> 
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