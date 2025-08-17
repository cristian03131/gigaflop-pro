class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Para errores esperados (operacionales)

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  // Si las cabeceras ya fueron enviadas, pasar al siguiente middleware por defecto
  if (res.headersSent) {
    return next(err);
  }

  // Asignar valores por defecto para estado HTTP y mensaje, si no vienen
  err.statusCode = err.statusCode || err.status || (err.name === 'ValidationError' ? 400 : 500);
  err.status = err.status || (err.statusCode.toString().startsWith('4') ? 'fail' : 'error');

  // En modo desarrollo, mostrar detalle completo
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  // En producción separar errores operacionales y no operacionales
  if (err.isOperational) {
    // Errores esperados - enviar mensaje limpio
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Errores inesperados - loggear y enviar mensaje genérico para no revelar detalles
    console.error('ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Algo salió mal en el servidor!',
    });
  }
};

export default AppError;

