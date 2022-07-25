import { types } from '../types/types'

export const login = (user) => ({
    type: types.LOGIN,
    payload : {
        ...user
    }
})

export const setLeftData = (userData) => ({
    type: types.SETLEFTDATA,
    payload : {
        nombre: userData.nombre,
        apellido: userData.apellido,
        carrera: userData.carrera,
        email: userData.email,
    }
})

export const logout = () => ({
    type: types.LOGOUT
})