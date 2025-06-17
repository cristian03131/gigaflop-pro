// este archivo define el contexto de usuario para la aplicación React
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios
    .get('/api/usuarios/profile', { withCredentials: true })
    .then(res => setUsuario(res.data.usuario))
    .catch(() => setUsuario(null))
    .finally(() => setCargando(false));
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, cargando }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);