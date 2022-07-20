import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { addLeftDataFromUser, registerUser } from '../../services/auth-services'
import { login, setLeftData } from '../../actions/auth-actions'
import { authContext } from '../../context/context'
import { validateUserSignUpForm } from '../../validations/validateUserSignUp'

const RegistrationPage = () => {

  const [ error, setError ] = useState({
    responsibleInput: null,
    message: null
  });

  const history = useNavigate();
  const {dispatch} = useContext(authContext);
  const { message, responsibleInput} = error;

  const [ formValues, handleInputChanges ] = useForm({usuario: "",
                                                     nombre: "",
                                                     apellido: "",
                                                     password: "",
                                                     password2: "",
                                                     carrera: "",
                                                     email: ""
                                                   })

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // En caso de que la informacion del formulario sea valida
    let esValido = validateUserSignUpForm(formValues)
    
    if(esValido === true){
      setError({responsibleInput: null, message: null})
      registerUser( formValues.nombre, formValues.email, formValues.password)
      .then(data => {
        dispatch(login(data))
        addLeftDataFromUser(formValues)
          .then(res => {
            if(res){
              dispatch(setLeftData(formValues))
            }
            history('/itlamor/feed')
        })
      })  
    }
    else{
      setError({
        message: esValido[0],
        responsibleInput: esValido[1]
      })
    }
  }

  return (
    <>
      <h1 className='authentication__title text-gray'>Registrate</h1>
      <p className='text-gray'>Es hora de declarar tu amor, itlasiano/a</p>

      <form onSubmit={handleOnSubmit} className='authentication__container mt-2'>

        <input 
          type="text" 
          name='usuario'
          placeholder='Nombre de Usuario'
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value={formValues.usuario}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 0) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }
        <input 
          type="password" 
          name= 'password'
          placeholder='Contraseña' 
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value={formValues.password}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 1) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }
        <input 
          type="password" 
          name= 'password2'
          placeholder='Vuelva a escribir su contraseña' 
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value={formValues.password2}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 2) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }
        <input 
          type="text" 
          name= 'email'
          placeholder='Correo Electrónico' 
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value={formValues.email}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 3) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }
        <input 
          type="text"
          name='nombre' 
          placeholder='Nombre'
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value={formValues.nombre}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 4) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }
        <input 
          type="text" 
          name='apellido'
          placeholder='Apellido'
          className='authentication__input mt-3 p-1'
          autoComplete='off'
          value = {formValues.apellido}
          onChange={handleInputChanges}
        />
        {
          (message && responsibleInput === 5) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }

        <select 
          name="carrera" 
          className='authentication__input authentication__select mt-3 p-1' 
          value={formValues.carrera}
          onChange={handleInputChanges}
        >
          
          <option value="Carrera" defaultValue={true}>Carrera</option>

          <option value="Ciencia de Datos">
            Ciencia de Datos
          </option>
          
          <option value="Desarrollo de Software">
            Desarrollo de Software
          </option>
          
          <option value="Desarrollo de Videojuegos y Simulaciones">
            Desarrollo de Videojuegos y Simulaciones
          </option>
          
          <option value="Energías Renovables">
            Energías Renovables
          </option>
          
          <option value="Informática Forense">
            Informática Forense
          </option>
          
          <option value="Inteligencia Artificial">
            Inteligencia Artificial
          </option>
          
          <option value="Manufactura Automatizada">
            Manufactura Automatizada
          </option>
          
          <option value="Manufactura de dispositivos médicos">
            Manufactura de dispositivos médicos
          </option>
          
          <option value="Mecatrónica">
            Mecatrónica
          </option>
          
          <option value="Multimedia">
            Multimedia
          </option>
          
          <option value="Seguridad Informática">
            Seguridad Informática
          </option>
          
          <option value="Sonido">
            Sonido
          </option>
        </select>
        {
          (message && responsibleInput === 6) && 
          (
            <p className='text-red w-full mt-1 ml-5'>
              {message}
            </p>
          )
        }

        {/* <label className='text-gray mt-5 pointer'>
          <input 
            type="file"
            name='profPicture'
            accept='image/*'
            className=' none'
          />
          Selecciona una foto (opcional)
        </label> */}

        <button type="submit" className='btn btn-primary mt-4'>
          Registrate ya
        </button>

        <Link to='/auth/login' className='link text-gray mt-1'>
          O ¿Ya tienes una cuenta?
        </Link>

      </form>
      </>
  )
}

export default RegistrationPage