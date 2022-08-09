import { types } from "../types/types";

export const openProfile = (profileInfo, to) => {
   
    let payload;

    if(to === "from"){
        payload = {
            name: profileInfo.nameOrigin,
            lastName: profileInfo.lastNameOrigin,
            career: profileInfo.careerOrigin,
            photo: profileInfo.profilePicOrigin
        }
    }
    else{
        payload = {
            name: profileInfo.nameTo,
            lastName: profileInfo.lastNameTo,
            career: profileInfo.careerTo,
            photo: profileInfo.profilePicTo
        }
    }

    return {
        type: types.OPENPROFILE,
        open: true,
        payload
    }
}

export const closeProfile = () => ({
    type: types.CLOSEPROFILE
})