import validator from "validator";

export const validateUserSignUpForm = (form) => {

    if(form.password.length < 8) return ["La contraseña debe de tener al menos 8 caracteres", 1]
    if(form.password !== form.password2) return ["Las contraseñas deben ser iguales", 2]
    if(form.email === "")return ["El correo es requerido", 3]
    if(!validator.isEmail(form.email)) return ["El correo es invalido", 3]
    if(form.nombre === "") return ["El nombre es requerido", 4]
    if(form.apellido === "") return ["El apellido es requerido", 5]
    if(form.carrera === "")return["Debe seleccionar su carrera", 6]

    return true;
}

export const validateLogin = (email, password) => {

    if(email === "")return ["El correo es requerido", 0]
    if(!validator.isEmail(email)) return ["El correo es invalido", 0]
    if(password === "") return ["La contraseña es requerida", 1]

    return true;
}

export const validatePostUpload = (toWhom, body) => {
    
    if(toWhom === "")return ["Debe seleccionar el destinatario", 0]
    if(body === "") return ["Agregue el contenido de la declaración", 1]

    return true
}

export const validateOther = (name, lastName) => {
    
    if(name === "")return ["Agregue el nombre", 0]
    if(lastName === "") return ["Agregue el apellido", 1]

    return true
}