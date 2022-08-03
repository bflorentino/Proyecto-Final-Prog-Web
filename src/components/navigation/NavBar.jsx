import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../../actions/auth-actions';
import { authContext } from '../../context/context'
import { logoutFirebase } from '../../services/auth-services';

const NavBar = () => {

  const history = useNavigate();
  const {dispatch, auth} = useContext(authContext)

  const handleLogout = (e) => {
    logoutFirebase()
    .then(out => {
      dispatch(logout())
      history('/auth/login')
    })
  }

  return (
    <header className='nav__header'>

      <Link to='/itlamor/feed'>
        <img src="../../assets/img/logo.png" alt="" className='nav__logo' />
      </Link>

      <nav className='nav__navbar'>
        <ul className='nav__linksCont'>
          <li className='nav__item'>
            <Link to='/itlamor/feed' className='nav__link'>Inicio</Link> 
          </li>

          {/*Si hay un usuario logueado el menu presentara opciones correspondientes, en el caso de que no presentará los enlaces para login y registrrse  */ }
          {
            auth?.uid
            ? 
              (
                <>
                  <li className='nav__item'>
                    <Link to='/itlamor/post' className='nav__link'>Declaración</Link>
                  </li>
                  <li className='nav__item'>
                    <button onClick={handleLogout} className='nav__link btn'>Salir</button>
                  </li>
                </>
              )
              :
              (
                <>
                  <li className='nav__item'>
                    <Link to='/auth/login' className='nav__link'>Login</Link>
                  </li>
                  <li className='nav__item'>
                    <Link to='/auth/sign-up' className='nav__link'>Registrarse</Link>                 
                  </li>
                </>
              )
          }
        </ul>
      </nav>

    </header>
  )
}

export default NavBar