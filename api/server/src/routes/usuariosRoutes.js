import { Router } from "express";
import { login, register, logout, profile, checkAuth} from "../controllers/usuariosControllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRegister, validateLogin } from '../middlewares/validations.js';

const router = Router();




// Rutas de autenticación
router.post('/register',validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/checkAuth', authRequired, checkAuth)

export default router;