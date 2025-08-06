import pool from '../config/db.js';


// modelo para crear cliente
export const crearCliente = async ({ razon_social, cuit }) => {
  const query = 'INSERT INTO cliente (razon_social, cuit) VALUES ($1, $2) RETURNING id';
  const { rows } = await pool.query(query, [razon_social, cuit]);
  return rows[0].id;
};

//modelo para listar clientes
export const listarClientes = async () => {
  const query = 'SELECT * FROM cliente';
  const { rows } = await pool.query(query);
  return rows;
};

//modelo para listar cliente por razon social
export const listarCliente = async ({ razon_social }) => {
  const query = 'SELECT * FROM cliente WHERE razon_social ILIKE $1';
  const { rows } = await pool.query(query, [`%${razon_social}%`]);
  return rows;
};


//modelo para listar un cliente por razon social o cuit o id
//export const listarCliente = async ({ id = '', razon_social = '', cuit = '' }) => {
  //let query = 'SELECT * FROM cliente WHERE 1=1';
  //const valores = [];

  //if (id) {
    //query += ' AND id = ?';
    //valores.push(id);
  //}
  //if (razon_social) {
    //query += ' AND razon_social LIKE ?';
    //valores.push(`%${razon_social}%`);
  //}
  //if (cuit) {
    //query += ' AND cuit LIKE ?';
    //valores.push(`%${cuit}%`);
  //}

  //query += ' LIMIT 1'; // solo un cliente

  //const [rows] = await pool.execute(query, valores);
  //return rows[0];
//};

    


//modelo para actualizar un cliente por cuit
export const actualizarCliente = async (cuit, { razon_social }) => {
  const query = 'UPDATE cliente SET razon_social = $1 WHERE cuit = $2';
  const result = await pool.query(query, [razon_social, cuit]);
  return result.rowCount; // filas afectadas con pg
};

//modelo para eliminar un cliente por cuit
export const eliminarCliente = async (cuit) => {
  const query = 'DELETE FROM cliente WHERE cuit = $1';
  const result = await pool.query(query, [cuit]);
  return result.rowCount; // filas afectadas
};