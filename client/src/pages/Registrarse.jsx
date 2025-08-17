import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ajustá la ruta si es necesario

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMensaje('Cuenta creada correctamente. Por favor revisa tu email para confirmar tu cuenta.');
      setEmail('');
      setPassword('');
      // Opcional: Redirigir al login luego de un delay para que usuario lea el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Crear cuenta</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
    </div>
  );
};

export default Registrarse;
