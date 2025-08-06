import pool from '../config/db.js';

// Buscar usuario por email
export async function findUserByEmail(email) {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

// Crear nuevo usuario
export async function createUser(usuario, email, hashedPassword) {
  const query = 'INSERT INTO usuarios (usuario, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id';
  const { rows } = await pool.query(query, [usuario, email, hashedPassword, 'Vendedor']);
  return rows[0].id;
}

// Buscar usuario por ID
export async function findUserById(id) {
  const query = 'SELECT id, usuario, email FROM usuarios WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

