import pool from '../config/db.js'; // Importa la conexión a la base de datos

// Buscar usuario por email
export async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]); // Cambio "users" por "usuarios"
  return rows[0];
}

// Crear nuevo usuario - tenemos que pasarle el email y el password
export async function createUser(usuario, email, hashedPassword) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (usuario, email, password, rol) VALUES (?, ?, ? , ?)', // Cambio "users" por "usuarios"
    [usuario, email, hashedPassword, 'Vendedor'] // Se asigna 'Vendedor' como rol por defecto
  );
  return result.insertId;
}

// Buscar usuario por ID
export async function findUserById(id) {
  const [rows] = await pool.query('SELECT id, usuario, email FROM usuarios WHERE id = ?', [id]); // Cambio "users" por "usuarios"
  return rows[0];
}
