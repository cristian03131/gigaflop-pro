import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || '';

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/usuarios/profile`, { withCredentials: true })
      .then(res => {
        if (res.data && res.data.usuario) {
          setUsuario(res.data.usuario);
        } else {
          setUsuario(null);
        }
      })
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, cargando }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook custom para consumir el contexto de usuario
export const useUser = () => useContext(UserContext);

