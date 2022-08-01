import { types } from "../types/types";


export const posts = (action, state = []) => {

    switch(action.type) {

        case types.GETPOST:
            return [...action.payload]

        case types.ADDPOST:
            return [action.payload, ...state]

        default:
            return state
    }

}