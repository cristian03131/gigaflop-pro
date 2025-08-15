import supabase from '../config/supabaseClient';

export const listarCondicionesComerciales = async () => {
  const { data, error } = await supabase
    .from('condiciones_comerciales')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const crearCondicionComercial = async ({ id_cliente, forma_pago, tipo_cambio, dias_pago, mark_up_maximo, observaciones }) => {
  const { data, error } = await supabase
    .from('condiciones_comerciales')
    .insert({ id_cliente, forma_pago, tipo_cambio, dias_pago, mark_up_maximo, observaciones })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const actualizarCondicionComercial = async (id, datos) => {
  const { data, error } = await supabase
    .from('condiciones_comerciales')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length;
};

export const eliminarCondicionComercial = async (id) => {
  const { data, error } = await supabase
    .from('condiciones_comerciales')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length;
};
