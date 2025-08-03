import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import '../CSS/login.css'
import axios from 'axios';
import { useUser } from '../context/UserContext.jsx';

const Login = () => {
  const { setUsuario } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/usuarios/login`,
        { email, password },
        { withCredentials: true }
      );
      setUsuario(res.data.usuario);
      navigate('/menu');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error de conexión';
      setError(msg);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login
