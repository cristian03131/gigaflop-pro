export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Estado HTTP a usar
  const status = err.status || (err.name === 'ValidationError' ? 400 : 500);

  if (process.env.NODE_ENV === 'development') {
    // En desarrollo muestras detalle completo
    return res.status(status).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    // En producción sólo mensaje ligero
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
}
