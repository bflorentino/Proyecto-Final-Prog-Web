import { types } from "../types/types"

export const authentication = (state = {}, action) => {

    switch(action.type){
        
        case (types.LOGIN):
            console.log(action)
            return {
                    uid: action.payload.uid,
                    nombre: action.payload.nombre
            };

        case (types.SETLEFTDATA):
            return{
                ...state,
                carrera: action.payload.carrera,
                apellido: action.payload.apellido,
                email: action.payload.email,
                usuario: action.payload.usuario
            }

        case (types.LOGOUT):
            return {}

        default:
            return state 
    }
}