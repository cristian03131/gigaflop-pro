import { Router } from 'express';
import {crearClienteController} from '../controllers/clientesControllers.js';
import {listarClientesController} from '../controllers/clientesControllers.js';
import {listarClienteController} from '../controllers/clientesControllers.js';
import {actualizarClienteController} from '../controllers/clientesControllers.js';
import {eliminarClienteController} from '../controllers/clientesControllers.js';
import { validateCrearCliente, validateActualizarCliente } from '../middlewares/validations.js';
const router = Router();




//Ruta para crear cliente 
router.post('/',validateCrearCliente,crearClienteController);

//Ruta para listar un solo cliente por razon social /cuit
router.get('/buscar', listarClienteController);

//Ruta para listar todos los clientes
router.get('/', listarClientesController);

//Ruta para actualizar un cliente por cuit
router.put('/:cuit',validateActualizarCliente,actualizarClienteController);

//Ruta para eliminar un cliente por cuit
router.delete('/:cuit', eliminarClienteController);

export default router; 






