import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationPage = () => {

  return (
    <>
      <h1 className='authentication__title text-gray'>Registrate</h1>
      <p className='text-gray'>Es hora de declarar tu amor, itlasiano/a</p>

      <form action="" className='authentication__container mt-2'>

        <input 
          type="text" 
          placeholder='Nombre de Usuario'
          className='authentication__input mt-3 p-1'
        />
        <input 
          type="password" 
          placeholder='Contraseña' 
          className='authentication__input mt-3 p-1'
        />
        <input 
          type="text" 
          placeholder='Nombre'
          className='authentication__input mt-3 p-1'
        />
        <input 
          type="text" 
          placeholder='Apellido'
          className='authentication__input mt-3 p-1'
        />
        <select name="" id="" className='authentication__input authentication__select mt-3 p-1' >
          
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