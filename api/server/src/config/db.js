//CONEXION A BD
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10, // límite de conexiones
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.connect()
  .then(client => {
    console.log('Conectado a PostgreSQL correctamente');
    client.release();
  })
  .catch(err => {
    console.error('Error al conectar a PostgreSQL:', err.message);
  });

export default pool;

//  try {
//  const [rows] = await pool.query('SELECT 1 + 1 AS result');
//console.log('Conexión exitosa con resultado:', rows[0].result);
//} catch (err) {
//  console.error('Error al conectar a la base de datos:', err);
//}

