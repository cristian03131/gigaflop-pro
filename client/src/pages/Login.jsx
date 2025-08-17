import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';
import { supabase } from '../supabaseClient';
import { useUser } from '../context/UserContext.jsx';

const Login = () => {
  const { setUsuario } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // limpiar error previo
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setUsuario(data.user);
      navigate('/menu');
    }
  };

  return (
    <div className="background-container">
      <div className="loginbox">
        <div className="title-container-login">
          <h2 className="title">GIGAFLOP</h2>
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

