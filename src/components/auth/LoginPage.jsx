import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { getLeftData, signIn } from '../../services/auth-services'
import { login, setLeftData } from '../../actions/auth-actions'
import { authContext } from '../../context/context'
import { validateLogin } from '../../validations/validations'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [ error, setError ] = useState({
    responsibleInput: null,
    message: null
  });

  const history = useNavigate();
  const {dispatch} = useContext(authContext);
  const { message, responsibleInput} = error;

  const [ formValues, handleInputChanges ] = useForm({password: "", email: ""})

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // En caso de que la informacion del formulario sea valida
    let esValido = validateLogin(formValues.email, formValues.password)
    
    if(esValido === true){
      setError({responsibleInput: null, message: null})
      
      signIn(formValues.email, formValues.password)
      .then(data => {
        if(data !== false){
          dispatch(login(data))
          history('/itlamor/feed')
          getLeftData(formValues.email)
          .then(res => {
              dispatch(setLeftData(res))
          })
        }else{
          Swal.fire({
            title: "Error de inicio de sesión",
            text:"Su nombre de usuario o contraseña son incorrectos",
            icon: "error",
            confirmButtonText: "Ok"
          })
        }
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
      <h1 className='authentication__title text-gray'>Inicio de sesión</h1>
      <p className='text-gray'>A ver que declaraciones hay para ti, itlasiano/a</p>

      <form onSubmit={handleOnSubmit} className='authentication__container mt-2'>

        <input 
          type="text" 
          name='email'
          placeholder='Correo Electrónico'
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
        <button type="submit" className='btn btn-primary mt-4'>
          Iniciar Sesión
        </button>

        <Link to='/auth/sign-up' className='link text-gray mt-1'>
          O ¿No te has registrado?
        </Link>

      </form>
      </>
)}

export default LoginPage