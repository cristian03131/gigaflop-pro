export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    // Ejemplo si usas librerías con este tipo de error
    return res.status(400).json({ message: err.message });
  }

  if (err.status) {
    // Si es un error personalizado con propiedad status
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
}
