# Documentación de proyecto de programación Web: itlamor

## Proyecto seleccionado:

Mi proyecto seleccionado fue el itla crush

## Datos personales

- Nombre: Bryan Xavier Florentino Montero
- Matrícula: 2020-10674

# Información sobre el proyecto

El nombre dado a esta aplicación creada es itlamor. La idea de este proyecto es la creación de un espacio social en el cual los itlasianos puedan unir sus corazones haciendo declaraciones de amor.

### Dicho proyecto ofrece las siguientes características (requeridas por el proyect) :

- La funcionalidad de crear una cuenta de usuario
- La funcionalidad de iniciar sesión
- La posibilidad de leer declaraciones de amor en la sección principal.
- La posibilidad de crear posts de declaración (Siempre y cuando dicha persona esté logeada)
- Los posts de declaración se pueden hacer de forma anónima o pública
- Los posts de declaración se pueden crear con un nivel de visualización público o privado. Si el nivel de visualización del post es público, entonces este post será visualizado tanto por usuarios logeados como para los que no lo estén; si dicho post es privado, solo lo podrán ver quienes esten logeados.


### Además ofrece otras características adicionales que le he agregado:

- Al hacer una declaración se pueden subir una imagen de la persona destinatario (opcional)
- Se pueden filtrar posts en la sección principal, es decir, un usuario (siempre que este logeado) podrá filtrar los posts por los que ha creado o por los posts en los que el usuario es el destinatario
- Si la identidad de un usuario que hizo un post es pública, al hacer click sobre el usuario se podrá visuzalizar información sobre dicho usuario.


## Capturas de pantalla del proyecto

### Sección login y registro de usuario

![Registro](public/assets/img/Para%20Proyecto/CrearUsuario.jpg)
![Login](public/assets/img/Para%20Proyecto/InicioSesion.jpg)

### Sección de creación de posts

![CrearPost](public/assets/img/Para%20Proyecto/CrearPost.jpg)
![CrearPostLleno](public/assets/img/Para%20Proyecto/CrearPostLleno.jpg)
![CrearPostOtro](public/assets/img/Para%20Proyecto/CrearPostOtro.jpg)

### Sección de visualización de posts

![Visualizacion1](public/assets/img/Para%20Proyecto/visualizacoin1.jpg)
![Visualizacion2](public/assets/img/Para%20Proyecto/visualizacion2.jpg)
![Visualizacion3](public/assets/img/Para%20Proyecto/visualizacion3.jpg)
![Informacion](public/assets/img/Para%20Proyecto/VerInfoUsuario.jpg)


## Caracteristicas generales de la UI:

- Diseño amigable y facil de entender
- Diseño Responsive


## Librerias NPM utlizadaas:

- react-router-dom
- validator
- firebase
- sweetAlert2
- uuid
- dotenv-webpack
- node-sass


## Para probar la APP:

Si quieres probar el demo de la APP puedes probarla mediante el siguiente link:

https://itlamor.netlify.app/

### De todas formas aqui estan los pasos a seguir si deseas ejecutarla localmente:

1. Clonar el proyecto y entrar al directorio para ejecutar el comando:

`npm install`

2. Debe obtener su token de firebase, en este proyecto los datos del sdk estan almacenados en variables de entorno, por lo que debe crear un proyecto en firebase y sustituir los datos del sdk con sus datos propios en el archivo config.firebase.js. Recuerde también habilitar el storage, la autenticación y la base de datos firestore

3. Una vez haya hecho todas las modificaciones necesarias ejecute:

`npm start`


## Tecnologias utlizadas en el proyecto

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)