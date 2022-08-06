import { types } from "../types/types";

export const openProfile = (profileInfo) => ({
    type: types.OPENPROFILE,
    open: true,
    payload: profileInfo
})

export const closeProfile = () => ({
    type: types.CLOSEPROFILE
})