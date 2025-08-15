import supabase from '../config/supabaseClient';

// Buscar usuario por email (incluye password, para login)
export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*') // incluye password para validaciones internas
    .eq('email', email)
    .single();

  if (error) throw error;
  return data;
}

// Crear nuevo usuario con rol por defecto 'Vendedor'
export async function createUser(usuario, email, hashedPassword) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert({
      usuario,
      email,
      password: hashedPassword,
      rol: 'Vendedor',
      estado: 'activo'  // ejemplo si querés inicializar estado
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

// Buscar usuario por ID, sin password
export async function findUserById(id) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, usuario, email, rol, estado, uid') // sin password
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Actualizar usuario por id (sin modificar password)
export async function actualizarUsuario(id, datos) {
  if ('password' in datos) {
    delete datos.password; // evitar modificar password aquí
  }

  const { data, error } = await supabase
    .from('usuarios')
    .update(datos)
    .eq('id', id);

  if (error) throw error;
  return data.length; // número de filas afectadas
}

// Actualizar password por id (función separada)
export async function actualizarPassword(id, hashedPassword) {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ password: hashedPassword })
    .eq('id', id);

  if (error) throw error;
  return data.length; // número de filas afectadas
}
