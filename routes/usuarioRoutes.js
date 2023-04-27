import espress from "express";
import { formularioLogin, formularioRegistro, formularioOlvidePassword } from "../controllers/usuarioController.js";

const router = espress.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro );
router.get('/olvide-password', formularioOlvidePassword );

 

export default router