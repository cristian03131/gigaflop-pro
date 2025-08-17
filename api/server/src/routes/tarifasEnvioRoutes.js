import { Router } from 'express';
import {
  listarTarifasEnvio,
  crearTarifaEnvio,
  obtenerTarifaEnvioPorId,
  actualizarTarifaEnvio,
  eliminarTarifaEnvio
} from '../controllers/tarifasEnvioController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarTarifasEnvio);
router.get('/:id', authRequired, obtenerTarifaEnvioPorId);
router.post('/', authRequired, crearTarifaEnvio);
router.put('/:id', authRequired, actualizarTarifaEnvio);
router.delete('/:id', authRequired, eliminarTarifaEnvio);

export default router;
