import { body, validationResult, param } from 'express-validator';

// Middleware para chequear errores de validación y enviar respuesta
export const validarResultado = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validación para registro de usuario
export const validateRegister = [
  body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  body('email').isEmail().withMessage('El email debe ser válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validarResultado,
];

// Validación para login
export const validateLogin = [
  body('email').isEmail().withMessage('El email debe ser válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  validarResultado,
];

// Validación para crear cliente
export const validateCrearCliente = [
  body('razon_social').notEmpty().withMessage('Razón social es obligatoria'),
  body('cuit')
    .notEmpty().withMessage('CUIT es obligatorio')
    .isNumeric().withMessage('CUIT debe ser numérico')
    .isLength({ min: 11, max: 11 }).withMessage('CUIT debe tener 11 dígitos'),
  validarResultado,
];

// Validación para actualizar cliente
export const validateActualizarCliente = [
  param('cuit').notEmpty().withMessage('CUIT es requerido en la URL'),
  body('razon_social').notEmpty().withMessage('Razón social es obligatoria'),
  validarResultado,
];

