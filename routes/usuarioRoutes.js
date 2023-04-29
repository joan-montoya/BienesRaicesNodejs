import espress from "express";
import { formularioLogin,confirmar, registrar, formularioRegistro, formularioOlvidePassword } from "../controllers/usuarioController.js";

const router = espress.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro );
router.post('/registro', registrar );

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword );

 

export default router