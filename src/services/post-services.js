import { addDoc, 
    collection, 
    getDocs, 
    query, 
    where } from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { db, storage } from '../firebase/config.firebase'
import { getLeftData } from './auth-services';

export const getAll = async (collectionName) => {

    const { docs } = await getDocs(collection(db, collectionName))
    const snapshot = docs.map(doc => doc.data())

    return snapshot;
}

export const getWithEqualQuery = async (collect, field, value) => {

    const q = query(collection(db, collect), where(field, "==", value));
    const { docs } = await getDocs(q);
    const snapshot = docs.map(doc => doc.data())
  
    return snapshot
}

export const getUsersFromPosts = async (posts) => {

    // POR CADA POSTS DE LA LISTA DE POSTS OBTENEMOS LA INFORMACION DEL USUARIO QUE PUBLICÓ DICHO POST.
    for (const post of posts) {
        
        const data = await getLeftData(post.emailFrom)
        post.nameOrigin = data.nombre
        post.lastNameOrigin = data.apellido
        post.profilePicOrigin = data.photoURL
    }
    return posts
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

export const addImage = async (image, path) => {

    let url = null;

    if(image !== null){
        const imagesRef = ref(storage, `${path ? path : 'post-images'}/${v4()}`)
        await uploadBytes(imagesRef, image)
        url = await getDownloadURL(imagesRef)
    }
    return url
}