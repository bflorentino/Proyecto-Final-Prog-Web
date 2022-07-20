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
        ...userData
    }
})