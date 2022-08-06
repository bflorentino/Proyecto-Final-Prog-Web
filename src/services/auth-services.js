import {signInWithEmailAndPassword,
        signOut, 
        createUserWithEmailAndPassword, 
        updateProfile,
      } from 'firebase/auth'

import { addDoc, 
         collection, 
         getDocs, 
         query, 
         where } from 'firebase/firestore';

import { auth, db } from '../firebase/config.firebase'

export const registerUser = async (userName, email, password, picUrl) => {

   const {user} = await createUserWithEmailAndPassword(auth, email, password);
   
   await updateProfile(
      user, 
      {
         displayName: userName,
         photoURL: picUrl
     })

   return (
    {
       uid: user.uid,
       nombre: user.displayName,
       photoURL: user.photoURL
    }
   )
}

export const addLeftDataFromUser = async (user) => {

   const toAdd = {
         nombre: user.nombre,
         apellido: user.apellido,
         carrera: user.carrera,
         email: user.email,
         photoURL: user.url
   }
   
   try{
         await addDoc(collection(db, "users"), toAdd)
         return true
      }
      catch(e){
         return false
      }
   }

export const signIn = async (email, password) => {

   try{
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      return ({
         uid: user.uid,
         usuario: user.displayName,
         photoURL: user.photoURL
      })
   }
   catch(e){
      return false;
   }
}

export const getLeftData = async (email) => {

   const q = query(collection(db, "users"), where("email", "==", email));
   const { docs } = await getDocs(q);
 
   return docs[0].data()
}

export const logoutFirebase = async () => {
   await signOut(auth)
}