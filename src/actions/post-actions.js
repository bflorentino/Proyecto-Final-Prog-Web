import { addImage, addNewPost } from "../services/post-services";
import { types } from "../types/types";


export const addNew = (post,  image) => {

    addImage(image)
        .then(data => {
            addNewPost({...post, image: data})
        })
}