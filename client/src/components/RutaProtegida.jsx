import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const RutaProtegida = () => {
  const [autenticado, setAutenticado] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}/usuarios/checkAuth`, { withCredentials: true })
      .then(() => setAutenticado(true))
      .catch(() => setAutenticado(false));
  }, []);

  if (autenticado === null) return null; // o un spinner cargando

  return autenticado ? <Outlet /> : <Navigate to="/" />;
};

export default RutaProtegida;