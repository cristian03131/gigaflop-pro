import supabase from '../config/supabaseClient';

export const listarVendedores = async () => {
  const { data, error } = await supabase
    .from('vendedores')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearVendedor = async ({ id_usuario, nombre, apellido, legajo, status }) => {
  const { data, error } = await supabase
    .from('vendedores')
    .insert({ id_usuario, nombre, apellido, legajo, status })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarVendedor = async (id, datos) => {
  const { data, error } = await supabase
    .from('vendedores')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarVendedor = async (id) => {
  const { data, error } = await supabase
    .from('vendedores')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
