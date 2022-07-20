import {signInWithEmailAndPassword,
        signOut, 
        createUserWithEmailAndPassword, 
        updateProfile 
      } from 'firebase/auth'

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/config.firebase'

export const registerUser = async (name, email, password) => {

   const {user} = await createUserWithEmailAndPassword(auth, email, password);
   
   await updateProfile(
      user, 
      {
         displayName: name
     })

   return (
    {
       uid: user.uid,
       nombre: user.displayName,
    }
   )
}

export const addLeftDataFromUser = async (user) => {

   const toAdd = {
         nombre: user.nombre,
         apellido: user.apellido,
         carrera: user.carrera,
         email: user.email
   }
   
   try{
         await addDoc(collection(db, "users"), toAdd)
         return true
      }
      catch(e){
         console.log(e)
         return false
      }
   }