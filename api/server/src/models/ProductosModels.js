import pool from '../config/db.js';

// Buscar producto por part_number
export const buscarProductoPorPartNumber = async (partNumber) => {
  const query = 'SELECT * FROM productos WHERE LOWER(TRIM(part_number)) = LOWER(TRIM($1))';
  const { rows } = await pool.query(query, [partNumber]);
  return rows[0]; // Devuelve uno
};

// Buscar productos por columna y valor
export const buscarProductosPorColumna = async (columna, valor) => {
  const columnasPermitidas = ['part_number', 'detalle', 'marca', 'categoria']; // Columnas válidas
  if (!columnasPermitidas.includes(columna)) throw new Error('Columna no válida');

  // Construir la consulta usando interpolación solo para el nombre de la columna validado
  const query = `SELECT * FROM productos WHERE LOWER(TRIM(${columna})) LIKE $1`;
  const { rows } = await pool.query(query, [`%${valor.trim().toLowerCase()}%`]);
  return rows;
};

// Obtener todos los productos
export const obtenerTodosLosProductos = async () => {
  const query = 'SELECT * FROM productos';
  const { rows } = await pool.query(query);
  return rows;
};

