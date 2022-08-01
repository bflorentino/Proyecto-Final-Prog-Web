import { addDoc, 
    collection, 
    getDocs, 
    query, 
    where } from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { db, storage } from '../firebase/config.firebase'

export const getAllUsers = async () => {

    const { docs } = await getDocs(collection(db, "users"))
    const users = docs.map(doc => doc.data())

    return users;
}

export const addNewPost = async (post) => {
  
  try{
        await addDoc(collection(db, "posts"), post)
        return true
     }
     catch(e){
        return false
     }
}

export const addImage = async (image) => {

    let url = null;

    if(image !== null){
        const imagesRef = ref(storage, `post-images/${v4()}`)
        await uploadBytes(imagesRef, image)
        url = await getDownloadURL(imagesRef)
    }
    return url
}