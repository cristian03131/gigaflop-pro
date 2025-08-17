import { Router } from 'express';
import {
  listarCotizaciones,
  crearCotizacion,
  obtenerCotizacionPorId,
  actualizarCotizacion,
  eliminarCotizacion
} from '../controllers/cotizacionesController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarCotizaciones);
router.get('/:id', authRequired, obtenerCotizacionPorId);
router.post('/', authRequired, crearCotizacion);
router.put('/:id', authRequired, actualizarCotizacion);
router.delete('/:id', authRequired, eliminarCotizacion);

export default router;
