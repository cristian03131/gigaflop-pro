import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const RutaProtegida = () => {
  const [autenticado, setAutenticado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/usuarios/checkAuth', { withCredentials: true })
      .then(() => {
        setAutenticado(true);
        setError(null);
      })
      .catch(() => {
        setAutenticado(false);
      });
  }, []);

  if (autenticado === null) return <div>Cargando...</div>;

  if (error) return <div>Error verificando autenticación</div>;

  return autenticado ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida;
