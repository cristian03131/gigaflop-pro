import supabase from './supabaseClient.js';

async function testConnection() {
  const { data, error } = await supabase
    .from('Usuarios')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error al conectar con Supabase:', error);
  } else {
    console.log('Conexión exitosa con Supabase, datos:', data);
  }
}

testConnection();

