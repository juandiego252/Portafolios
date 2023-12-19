//importar la variable app
const { connect } = require('mongoose')
//
require('dotenv').config()

const connection = require('./database.js')
const app = require('./server.js')

//Ejecutar el metodo connection
connection()



//ejecutar en servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})