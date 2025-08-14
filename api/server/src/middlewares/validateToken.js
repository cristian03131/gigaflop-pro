import jwt from 'jsonwebtoken';

// Middleware de validación de token usando el JWT Secret de Supabase desde variables de entorno
export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }

    // Obtenés directamente el secreto desde la variable de entorno
    const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

    if (!JWT_SECRET) {
      console.error('JWT Secret no está definido en las variables de entorno');
      return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado, por favor inicia sesión de nuevo' });
    }
    return res.status(403).json({ message: 'Token inválido' });
  }
};

