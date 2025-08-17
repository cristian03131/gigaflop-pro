import supabase from '../config/supabaseClient.js';

export const listarDetallesCotizaciones = async () => {
  const { data, error } = await supabase
    .from('detalles_cotizaciones')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearDetalleCotizacion = async ({
  id_cotizacion,
  id_producto,
  cantidad,
  precio_unitario,
  descuento,
  subtotal,
  iva,
  total_iva_incluido
}) => {
  const { data, error } = await supabase
    .from('detalles_cotizaciones')
    .insert({
      id_cotizacion,
      id_producto,
      cantidad,
      precio_unitario,
      descuento,
      subtotal,
      iva,
      total_iva_incluido
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarDetalleCotizacion = async (id, datos) => {
  const { data, error } = await supabase
    .from('detalles_cotizaciones')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarDetalleCotizacion = async (id) => {
  const { data, error } = await supabase
    .from('detalles_cotizaciones')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
