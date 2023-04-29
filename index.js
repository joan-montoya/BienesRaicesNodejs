import  express  from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//Crear la app
const app = express() 

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

//habilitar Cookie Parser
app.use( cookieParser() )

//habilitar CSRF
app.use( csrf({ cookie: true}) )

//conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log("conexion correcta a la base de datos")
} catch (error){
    console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Publica o contenedor de archivos estaticos
app.use( express.static('public'))


// //Routing
app.use('/auth', usuarioRoutes)

//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto', port)
});