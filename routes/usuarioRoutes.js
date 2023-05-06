import espress from "express";
import { formularioLogin,confirmar,comprobarToken, nuevoPassword, resetPassword, registrar, formularioRegistro, formularioOlvidePassword } from "../controllers/usuarioController.js";

const router = espress.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro );
router.post('/registro', registrar );

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword );
router.post('/olvide-password', resetPassword );

//almacenar token
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

 

export default router