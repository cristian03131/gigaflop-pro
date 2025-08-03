import { body, validationResult, param, query } from 'express-validator';

// Validación para registro de usuario
export const validateRegister = [
  body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  body('email').isEmail().withMessage('El email debe ser válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para login
export const validateLogin = [
  body('email').isEmail().withMessage('El email debe ser válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para crear cliente
export const validateCrearCliente = [
  body('razon_social').notEmpty().withMessage('razón social es obligatoria'),
  body('cuit').notEmpty().withMessage('cuit es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación para actualizar cliente
export const validateActualizarCliente = [
  param('cuit').notEmpty().withMessage('cuit es requerido en la URL'),
  body('razon_social').notEmpty().withMessage('razón social es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
