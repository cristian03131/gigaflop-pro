import supabase from '../config/supabaseClient.js';

// Buscar producto por part_number exacto (ignorando mayúsculas y espacios)
export const buscarProductoPorPartNumber = async (partNumber) => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('part_number', partNumber.trim())
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

// Buscar productos por columna y valor (columnas permitidas: part_number, detalle, marca, categoria)
export const buscarProductosPorColumna = async (columna, valor) => {
  const columnasPermitidas = ['part_number', 'detalle', 'marca', 'categoria'];

  if (!columnasPermitidas.includes(columna)) {
    throw new Error('Columna no válida');
  }

  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .ilike(columna, `%${valor.trim()}%`);

  if (error) throw error;

  return data;
};

// Obtener todos los productos ordenados por id (ascendente)
export const obtenerTodosLosProductos = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  return data;
};

