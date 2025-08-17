import { Router } from 'express';
import {
  listarDetallesCotizaciones,
  crearDetalleCotizacion,
  obtenerDetalleCotizacionPorId,
  actualizarDetalleCotizacion,
  eliminarDetalleCotizacion
} from '../controllers/detallesCotizacionesController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarDetallesCotizaciones);
router.get('/:id', authRequired, obtenerDetalleCotizacionPorId);
router.post('/', authRequired, crearDetalleCotizacion);
router.put('/:id', authRequired, actualizarDetalleCotizacion);
router.delete('/:id', authRequired, eliminarDetalleCotizacion);

export default router;
