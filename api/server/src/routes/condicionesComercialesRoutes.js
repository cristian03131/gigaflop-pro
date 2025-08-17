import { Router } from 'express';
import {
  listarCondicionesComerciales,
  crearCondicionComercial,
  obtenerCondicionComercialPorId,
  actualizarCondicionComercial,
  eliminarCondicionComercial
} from '../controllers/condicionesComercialesController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarCondicionesComerciales);
router.get('/:id', authRequired, obtenerCondicionComercialPorId);
router.post('/', authRequired, crearCondicionComercial);
router.put('/:id', authRequired, actualizarCondicionComercial);
router.delete('/:id', authRequired, eliminarCondicionComercial);

export default router;
