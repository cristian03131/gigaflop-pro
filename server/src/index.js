if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}
import app from './app.js';
import pool from './config/db.js';
// Opcional: verificar conexión al iniciar
async function startServer() {
  try {
    // Verificamos si la conexión funciona
    await pool.query('SELECT 1');
    console.log('>>>>>> Base de datos conectada<<<<<<');

    const PORT = process.env.PORT || 4000;
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

startServer();