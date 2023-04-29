import { check, validationResult} from 'express-validator'
import { generarId } from '../helpers/token.js'
import { emailRegistro } from '../helpers/emails.js'

import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Secion'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    })
}

const registrar = async (req, res) => {  
    
    //creamos las validaciones del registro del usuario una a una
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6}).withMessage('El password debe ser minimo 6 caracteres').run(req)
    await check('repite_password').equals(req.body.password).withMessage('Los passwords no son iguales').run(req)
    
    let resultado = validationResult(req)

    //verificar que el resultado este vacio 
    if(!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //extraccion de datos
    const { nombre, email, password } = req.body

    //verificar que el usuario no existe en la base de datos
    const existeUsuario = await Usuario.findOne( { where: { email } })
    
    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya existe en la base de datos'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //almacenar usuario
    const usuario = await Usuario.create({
        nombre,
        email, 
        password,
        token: generarId()
    })

    //envia email de confirmacion 
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //mostrar mensaje de confirmacion 
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un Email de confirmacion, presiona en el enlace para confirmar'
    }) 
}

//funcion que comprueba una cuenta
const confirmar = async (req, res) =>{

    //cargamos el token a una variable
    const { token } = req.params

    //verificar si el token es valido
    const usuario = await Usuario.findOne({ where: { token }})

    if(!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu Cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    // confirmar la cuenta
    usuario.token = null
    usuario.confirmado = true

    //guardamos la nueva informacion del usuario en la base de datos
    await usuario.save();

    //mostramso una vista de confirmacion 
    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta ha sido confirmada', 
        error: false
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera Tu Acceso a Bienes Raices'
    })
}

export {
    formularioLogin,  
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
}