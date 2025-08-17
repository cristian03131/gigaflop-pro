import supabase from '../config/supabaseClient.js';

export const listarCotizaciones = async () => {
  const { data, error } = await supabase
    .from('cotizaciones')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearCotizacion = async ({
  numero_cotizacion, 
  id_cliente, 
  id_contacto, 
  id_condicion, 
  id_vendedor, 
  fecha, 
  vigencia_hasta,
  observaciones,
  plazo_entrega,
  costo_envio,
  estado,
  zona_envio,
  id_tarifa_envio
}) => {
  const { data, error } = await supabase
    .from('cotizaciones')
    .insert({
      numero_cotizacion, 
      id_cliente, 
      id_contacto, 
      id_condicion, 
      id_vendedor, 
      fecha, 
      vigencia_hasta,
      observaciones,
      plazo_entrega,
      costo_envio,
      estado,
      zona_envio,
      id_tarifa_envio
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarCotizacion = async (id, datos) => {
  const { data, error } = await supabase
    .from('cotizaciones')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarCotizacion = async (id) => {
  const { data, error } = await supabase
    .from('cotizaciones')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
