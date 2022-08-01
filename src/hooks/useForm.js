import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState)
    
    const handleInputChanges = ({ target }) =>{
        console.log(target)
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }
    
    const reset = () => {
        setFormValues(initialState)
    }
    
    return [formValues, handleInputChanges, reset]

}