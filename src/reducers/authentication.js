import { types } from "../types/types"

export const authentication = (state = {}, action) => {

    switch(action.type){
        
        case (types.LOGIN):
            return {
                    uid: action.payload.uid,
                    usuario: action.payload.usuario
            };

        case (types.SETLEFTDATA):
            // Guardar en el localStorage los datos obtenidos del usuario una vez inicio sesión
            window.localStorage.setItem("user Data", JSON.stringify(action.payload))
            return{
                ...state,
                carrera: action.payload.carrera,
                apellido: action.payload.apellido,
                email: action.payload.email,
                nombre: action.payload.nombre
            }
        case (types.LOGOUT):
            window.localStorage.removeItem("user Data")
            return {}

        default:
            return state 
    }
}