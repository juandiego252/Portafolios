const express = require('express')
//Importancion de path
const path = require('path')

//INICIALIZAMOS
const app = express()
require('./config/passport')

//Importar fileUpload
const fileUpload = require('express-fileupload')

//CONFIGURACIONES
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname,'views'))

//Establecer la carpeta temporal y el directorio
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

const { engine }  = require('express-handlebars')

//Importar el metodo overrride
const methodOverride = require('method-override');

//Importacion de passport
const passport = require('passport');
//Importacion de express-session
const session = require('express-session');

// Configuraciones extras
//Establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
//Establecer las configuraciones extras
app.engine('.hbs',engine({
    //Establecer el master page
    defaultLayout:'main',
    //establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    //establecer el path de la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    //Establecer la extension de las paginas
    extname:'.hbs'
}))
//Establecer el motor de plantillas
app.set('view engine','.hbs')

//MIDLEWARS
//servidor va a trrabjar con la informacion en base a formularios0
app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

//configurar la sesion del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
//Inicializar passportjs y session
app.use(passport.initialize())
app.use(passport.session())

//VARIABLES GLOBALES
//Crear una variable global
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    //res.locals.user = req.user?.email || null
    next()
})


//---- RUTAS ----

app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

//Archivos estaticos
//Definir archivo estaticos y publicos
app.use(express.static(path.join(__dirname,'public')))

module.exports = app