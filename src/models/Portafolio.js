//importamos el squema y el modelo
const { Schema, model } = require("mongoose");

//Crear un nuevo esquema --portafolioSchema
const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

//Exportar el portafololio
module.exports = model('portfolio',portfolioSchema)