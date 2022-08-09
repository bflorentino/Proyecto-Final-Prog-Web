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

    // POR CADA POST DE LA LISTA OBTENEMOS LA INFORMACION DE LOS USUARIOS INVOLUCRADOS EN EL POST.
    for (const post of posts) {
        
        // Información del usuario que publica el post
        const data = await getLeftData(post.emailFrom)
        post.nameOrigin = data.nombre
        post.lastNameOrigin = data.apellido
        post.profilePicOrigin = data.photoURL
        post.careerOrigin = data.carrera

        // Información del usuario destinatario del post (siempre y cuando no se haya elegido por la opcion de otros en el dropdown)
        if(!post.other){
            console.log(post.toWhom)
            const data = await getLeftData(post.toWhom)
            post.nameTo = data.nombre
            post.lastNameTo = data.apellido
            post.profilePicTo = data.photoURL
            post.careerTo = data.carrera
        }
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