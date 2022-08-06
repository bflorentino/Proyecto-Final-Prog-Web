import { types } from "../types/types";

export const profile = (state = {open: false}, action) => {

    switch(action.type) {
        case (types.OPENPROFILE):
            return {...action.payload, open: true}

        case (types.CLOSEPROFILE):
            return {open: false}

        default:
            return state
    }
}