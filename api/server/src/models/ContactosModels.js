import supabase from '../config/supabaseClient.js';

export const listarContactos = async () => {
  const { data, error } = await supabase
    .from('contactos')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearContacto = async ({ id_cliente, nombre_contacto, apellido, area_contacto, telefono, email }) => {
  const { data, error } = await supabase
    .from('contactos')
    .insert({ id_cliente, nombre_contacto, apellido, area_contacto, telefono, email })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarContacto = async (id, datos) => {
  const { data, error } = await supabase
    .from('contactos')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarContacto = async (id) => {
  const { data, error } = await supabase
    .from('contactos')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
