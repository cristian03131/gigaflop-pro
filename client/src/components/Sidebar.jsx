import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const { usuario, setUsuario, cargando } = useUser(); // Hook para contexto usuario
  const navigate = useNavigate();

  if (cargando) return null;

  const handleLogout = async () => {
    try {
      await axios.post('/api/usuarios/logout', null, { withCredentials: true });
      setUsuario(null); // limpia el contexto
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      <input type="checkbox" id="btn-menu" />
      <div className="container-menu">
        <div className="cont-menu">
          <nav>
            <h5 className="nombre-sidebar">{usuario ? usuario.nombre : 'Usuario'}</h5>
            <NavLink to="/perfil">Mi Perfil</NavLink>
            <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          </nav>
          <label htmlFor="btn-menu">✖️</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
