//importar router de expres
const{Router} = require('express')
const { renderPortafolioForm, 
        createNewPortafolio, 
        renderAllPortafolios, 
        renderPortafolio, 
        renderEditPortafolioForm, 
        updatePortafolio, 
        deletePortafolio } = require('../controllers/portafolio.controllers')


     
//Instancear la variable router
const router = Router()

//Ruta para cargar la vista del formulario
const {isAuthenticated} = require('../helpers/validate-auth')   

//Ruta para cargar lka vita del portafolio
router.get('/portafolio/add',isAuthenticated, renderPortafolioForm)

//Ruta para capturar los datos del form y guardar en la base de datos
router.post('/portafolio/add',isAuthenticated, createNewPortafolio)

//Ruta para presentar todos los portafolios
router.get('/portafolios',isAuthenticated, renderAllPortafolios)

//ruta para presentar el detalle de un portafolio
router.get('/portafolio/:id',isAuthenticated, renderPortafolio)

//Ruta para cargar la vista del formulario
router.get('/portafolio/edit/:id',isAuthenticated, renderEditPortafolioForm)

//Ruta para capturar los datos del form y guardar en BDD
router.put('/portafolio/edit/:id',isAuthenticated, updatePortafolio)

//Ruta para eliminar un portafolioc
router.delete('/portafolio/delete/:id',isAuthenticated, deletePortafolio)

module.exports = router