import validator from "validator";

export const validateUserSignUpForm = (form) => {

    console.log(form)

    if(form.usuario === "")return["El nombre de usuario es requerido", 0]
    if(form.password.length < 8) return ["La contraseña debe de tener al menos 8 caracteres", 1]
    if(form.password !== form.password2) return ["Las contraseñas deben ser iguales", 2]
    if(form.email === "")return ["El correo es requerido", 3]
    if(!validator.isEmail(form.email)) return ["El correo es invalido", 3]
    if(form.nombre === "") return ["El nombre es requerido", 4]
    if(form.apellido === "") return ["El apellido es requerido", 5]
    if(form.carrera === "")return["Debe seleccionar su carrera", 6]

    return true;
}