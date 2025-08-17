import supabase from '../config/supabaseClient.js';

// Listar todas las tarifas de envío
export const listarTarifasEnvio = async () => {
  const { data, error } = await supabase
    .from('tarifas_envio')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data;
};

// Crear una nueva tarifa de envío
export const crearTarifaEnvio = async ({ zona_envio, descripcion, costos_usd, ultima_actualizacion }) => {
  const { data, error } = await supabase
    .from('tarifas_envio')
    .insert({ zona_envio, descripcion, costos_usd, ultima_actualizacion })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

// Actualizar una tarifa de envío por id
export const actualizarTarifaEnvio = async (id, datos) => {
  const { data, error } = await supabase
    .from('tarifas_envio')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length; // Cantidad de filas actualizadas
};

// Eliminar una tarifa de envío por id
export const eliminarTarifaEnvio = async (id) => {
  const { data, error } = await supabase
    .from('tarifas_envio')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data.length; // Cantidad de filas eliminadas
};
