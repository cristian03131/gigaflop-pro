import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const { usuario, setUsuario, cargando } = useUser();// este hook permite acceder al contexto de usuario
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  if (cargando) return null;

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/usuarios/logout`, null, { withCredentials: true });
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
            <a href="#">Mi Perfil</a>
            <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
          </nav>
          <label htmlFor="btn-menu">✖️</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;