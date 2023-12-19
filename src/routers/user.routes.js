const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
const router = Router()
const { redirectIfAuthenticated } = require('../helpers/validate-auth')
// Ruta para mostrar el fomrulario de login
router.get('/user/login', redirectIfAuthenticated, renderLoginForm)

//Ruta para mostrar el formulario del registro
router.get('/user/register', redirectIfAuthenticated,renderRegisterForm)
//Ruta para capturar los datos del formulario y almacenar en BDD
router.post('/user/register',registerNewUser)

//Ruta para mostrar el formulario del login
router.get('/user/login',redirectIfAuthenticated, renderLoginForm)
//Ruta para mostrar los datos del formulario y realizar el proceso de login conjunto con la base de datos
router.post('/user/login',loginUser)

//Ruta para cerrar sesion del Usuario
router.post('/user/logout',logoutUser)


module.exports =router