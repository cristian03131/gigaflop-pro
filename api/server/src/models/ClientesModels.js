import supabase from '../config/supabaseClient.js';

// Crear cliente
export const crearCliente = async ({ razon_social, cuit }) => {
  const { data, error } = await supabase
    .from('cliente')
    .insert({ razon_social, cuit })
    .select('id')
    .single();

  if (error) throw error;

  return data.id;
};

// Listar clientes
export const listarClientes = async () => {
  const { data, error } = await supabase
    .from('cliente')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  return data;
};

// Buscar clientes con filtros dinámicos
export const buscarClientes = async ({ id, razon_social, cuit }) => {
  let query = supabase.from('cliente').select('*').order('id', { ascending: true });

  if (id !== undefined) {
    query = query.eq('id', id);
  }
  if (razon_social) {
    query = query.ilike('razon_social', `%${razon_social}%`);
  }
  if (cuit) {
    query = query.ilike('cuit', `%${cuit}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

// Actualizar cliente por cuit
export const actualizarCliente = async (cuit, { razon_social }) => {
  const { data, error } = await supabase
    .from('cliente')
    .update({ razon_social })
    .eq('cuit', cuit);

  if (error) throw error;

  return data.length; // o data para los registros actualizados
};

// Eliminar cliente por cuit
export const eliminarCliente = async (cuit) => {
  const { data, error } = await supabase
    .from('cliente')
    .delete()
    .eq('cuit', cuit);

  if (error) throw error;

  return data.length; // o data para los registros eliminados
};
