const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Secion'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
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
    formularioOlvidePassword
}