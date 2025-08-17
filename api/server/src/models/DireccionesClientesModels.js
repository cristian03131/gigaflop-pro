import supabase from '../config/supabaseClient.js';

export const listarDireccionesClientes = async () => {
  const { data, error } = await supabase
    .from('direcciones_clientes')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearDireccionCliente = async ({
  id_cliente,
  calle,
  numeracion,
  piso,
  depto,
  locacion,
  localidad,
  provincia,
  codigo_postal
}) => {
  const { data, error } = await supabase
    .from('direcciones_clientes')
    .insert({
      id_cliente,
      calle,
      numeracion,
      piso,
      depto,
      locacion,
      localidad,
      provincia,
      codigo_postal
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarDireccionCliente = async (id, datos) => {
  const { data, error } = await supabase
    .from('direcciones_clientes')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarDireccionCliente = async (id) => {
  const { data, error } = await supabase
    .from('direcciones_clientes')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
