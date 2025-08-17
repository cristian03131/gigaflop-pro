import { Router } from 'express';
import {
  listarVendedores,
  crearVendedor,
  obtenerVendedorPorId,
  actualizarVendedor,
  eliminarVendedor
} from '../controllers/vendedoresController.js';

import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/', authRequired, listarVendedores);
router.get('/:id', authRequired, obtenerVendedorPorId);
router.post('/', authRequired, crearVendedor);
router.put('/:id', authRequired, actualizarVendedor);
router.delete('/:id', authRequired, eliminarVendedor);

export default router;
