import React, { useState } from 'react'
import { Portal } from "react-portal";
import { useForm } from '../../hooks/useForm';
import { validateOther } from '../../validations/validations';

const Other = ({setFormValues, formValues,  setIsOtherOpen}) => {
    
    const [ error, setError ] = useState({
        responsibleInput: null,
        message: null
    });
    
    const [ fValues, handleInputChanges ] = useForm({nombre:"" , apellido: ""})
    const {responsibleInput, message} = error;
    
    const closeModal = () => {
    
        document.getElementById("portal").classList.toggle("modal__show-modal")
        setIsOtherOpen(false)
    }

    // Agregando el nuevo nombre que será desplegado dentro del dropdown
    const applyOther = (e) => {
        
        e.preventDefault()

        const isValid = validateOther(fValues.nombre, fValues.apellido)

        if(isValid === true){

            setError({
                responsibleInput:null, 
                message:null
            })
            
            const option = document.createElement("option");
            option.value = `${fValues.nombre} ${fValues.apellido}`
            option.text = `${fValues.nombre} ${fValues.apellido}`
            document.getElementById('dest').appendChild(option)
            option.selected = true;
            
            setFormValues({...formValues, toWhom: option.value })
            closeModal()
        }
        else{
            setError({
                message: isValid[0],
                responsibleInput:isValid[1],
            })
        }
    }

    return (
    <Portal node={document && document.getElementById("portal")}>
        <div className='modal__content'>

            <button className='btn modal__close pointer' onClick={closeModal}>
                    x
            </button>
            <h2 className='text-center'>Otra persona</h2>
                <form action="" className='modal__data'>
                    <input 
                        type="text" 
                        name='nombre' 
                        onChange={handleInputChanges} 
                        value={formValues.nombre}
                        autoComplete ='off'
                        placeholder='Nombre del destinatario'
                        className='FormPost__input mt-2 pl-1'
                    /> 
                    {
                        (message && responsibleInput === 0) && 
                        (
                          <p className='text-red w-full mt-1 ml-5'>
                            {message}
                          </p>
                        )
                      }
                    <input 
                        type="text" 
                        name='apellido' 
                        onChange={handleInputChanges} 
                        value={formValues.apellido}
                        autoComplete="off" 
                        placeholder='Apellido del destinatario'
                        className='FormPost__input mt-2 pl-1'
                    />
                    {
                        (message && responsibleInput === 1) && 
                        (
                            <p className='text-red w-full mt-1 ml-5'>
                              {message}
                            </p>
                        )
                    }

                    <button className='btn btn-primary mt-2' onClick={applyOther}>
                        Aplicar
                    </button>
                </form>
        </div>
    </Portal>
  )
}

export default Other