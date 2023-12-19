//Importamos cloudinary
const cloudinary = require('cloudinary').v2

//Establecer las variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

//Crear el metodo para enviar la imagen a cloudinary y que la misma se almacene en e
module.exports.uploadImage = async(filePath) => {

    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}