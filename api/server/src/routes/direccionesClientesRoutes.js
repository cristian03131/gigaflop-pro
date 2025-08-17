import { Router } from 'express';
import {
  listarDireccionesClientes,
  crearDireccionCliente,
  obtenerDireccionClientePorId,
  actualizarDireccionCliente,
  eliminarDireccionCliente
} from '../controllers/direccionesClienteController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarDireccionesClientes);
router.get('/:id', authRequired, obtenerDireccionClientePorId);
router.post('/', authRequired, crearDireccionCliente);
router.put('/:id', authRequired, actualizarDireccionCliente);
router.delete('/:id', authRequired, eliminarDireccionCliente);

export default router;
