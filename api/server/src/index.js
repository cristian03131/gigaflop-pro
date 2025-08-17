import 'dotenv/config';  // Carga variables de entorno en desarrollo
import app from './app.js';
import pool from './config/supabaseClient.js';

// (Opcional) Verificar conexión a la base de datos al iniciar la función serverless
pool.query('SELECT 1')
  .then(() => console.log('>>>>>> Base de datos conectada<<<<<<'))
  .catch((error) => console.error('Error al conectar con la base de datos:', error));

// Exporta la app Express para que Vercel la use como función serverless
export default app;