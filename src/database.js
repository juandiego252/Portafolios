//importar mongoose
const mongoose = require('mongoose')


//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'
//Cadena de conexion a la Base de datos

//Crear un metodo para hacer la cadena de conexion 

connection = async()=>{
    try {
        //Invocar al metodo connected
         await mongoose.connect(process.env.MONGODB_URI)
         //Respuesta de la promesa
        console.log("Database is connected")
    } catch (error) {
        //Respuesta de la promesa == "error"
        console.log(error);
    }
}

//Exportar el metodo connect

module.exports = connection