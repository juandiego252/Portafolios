
//Importar el modelo usuario
const User = require('../models/User')
//importar passport 
const passport = require('passport')


//Muestra el formulario del registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//Muestra los datos del formulario y almacenar en la base de datos
const registerNewUser = async (req,res)=>{
    //Capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    //validar todos los campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //Validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    //Validar siu el usuario ya esta registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //Crear una nueva instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    //Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    //Guardar en la base de datos
    newUser.save()
    //Redireccionamiento
    res.redirect('/user/login')
}

//Muestra los datos del login 
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

//Muestra los datos del formulario y realizar el proceso de login conjunto con la base de datos
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

//Cerrar sesion del Usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

//Exportar los metodos (controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}