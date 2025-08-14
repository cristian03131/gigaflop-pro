import supabase from '../config/supabaseClient.js';

// Registrar usuario usando supabase.auth.signUp
export const register = async (req, res) => {
  const { email, password, usuario, rol = 'Vendedor' } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { usuario, rol } // info adicional en el perfil de autenticación
      }
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: 'Usuario registrado con éxito. Confirma tu email para activar la cuenta.',
      user: data.user
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Iniciar sesión usando supabase.auth.signInWithPassword
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return res.status(400).json({ message: error?.message || 'Error al iniciar sesión' });
    }

    // Enviar token de acceso (JWT) al cliente
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      session: data.session,
      user: data.user
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Cerrar sesión (logout)
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener perfil del usuario autenticado a partir del token (req.user debe estar seteado tras validación)
export const profile = async (req, res) => {
  try {
    // Suponiendo que tenés middleware que setea req.user con el token validado
    const userId = req.user.id;

    // Podés obtener info almacenada en la tabla 'usuarios', si la gestionás aparte:
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, usuario, email, rol, estado')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ usuario: data });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Verificar autenticacion revisando validez del JWT y existencia de req.user
export const checkAuth = async (req, res) => {
  try {
    if (!req.user) { // asumiendo middleware que valida el token y setea req.user
      return res.status(401).json({ authenticated: false, message: 'No autenticado' });
    }

    res.status(200).json({
      authenticated: true,
      usuario: { id: req.user.id, email: req.user.email }
    });
  } catch (error) {
    console.error('Error en checkAuth:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
