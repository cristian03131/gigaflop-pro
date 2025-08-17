import { Router } from 'express';
import {
  listarContactos,
  crearContacto,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto
} from '../controllers/contactosController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarContactos);
router.get('/:id', authRequired, obtenerContactoPorId);
router.post('/', authRequired, crearContacto);
router.put('/:id', authRequired, actualizarContacto);
router.delete('/:id', authRequired, eliminarContacto);

export default router;
