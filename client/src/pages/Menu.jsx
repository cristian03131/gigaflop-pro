import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useCotizaciones } from '../context/CotizacionesContext';
import MensajeAlerta from '../components/MensajeAlerta';
import '../CSS/menu.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const Menu = () => {
  const {
    cotizaciones,
    loading,
    eliminarCotizacion,
    editarCotizacion,
  } = useCotizaciones();

  const [searchTerm, setSearchTerm] = useState({
    id: '',
    fecha: '',
    vendedor: '',
    estado: '',
    cliente: ''
  });

  const [cotizacionAEliminar, setCotizacionAEliminar] = useState(null);
  const [cotizacionAEditar, setCotizacionAEditar] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  const filteredCotizaciones = cotizaciones.filter(cotizacion =>
    cotizacion.id.includes(searchTerm.id) &&
    cotizacion.fecha.includes(searchTerm.fecha) &&
    cotizacion.vendedor.toLowerCase().startsWith(searchTerm.vendedor.toLowerCase()) &&
    cotizacion.estado.toLowerCase().startsWith(searchTerm.estado.toLowerCase()) &&
    cotizacion.cliente.toLowerCase().startsWith(searchTerm.cliente.toLowerCase())
  );

  const getColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'aprobada':
        return '#00FF00';
      case 'pendiente':
        return '#FFD700';
      case 'rechazada':
        return '#FF0000';
      default:
        return 'black';
    }
  };

  const confirmarEliminacion = async () => {
    if (!cotizacionAEliminar) return;
    const resultado = await eliminarCotizacion(cotizacionAEliminar.id);
    if (!resultado.success) {
      setMensajeError('No se pudo eliminar la cotización');
    }
    setCotizacionAEliminar(null);
  };

  const confirmarEdicion = async (e, datosActualizados) => {
    e.preventDefault();
    if (!cotizacionAEditar) return;

    const resultado = await editarCotizacion(cotizacionAEditar.id, datosActualizados);
    if (!resultado.success) {
      setMensajeError('Error al actualizar la cotización');
    }
    setCotizacionAEditar(null);
  };

  if (loading) return <div>Cargando cotizaciones...</div>;

  return (
    <>
      <Sidebar />
      <div className="background-container-menu">
        <header className="header">
          <div className='container-header'>
            <div className="title-container">
              <h2 className="title-menu">GIGAFLOP</h2>
            </div>
          </div>
          <div className='container-icon'>
            <label htmlFor="btn-menu"><i className="bi bi-person-circle custom-icon"></i></label> 
          </div>
        </header>
        <div className='option'>
          <NavLink className='option-button2'>Cotizaciones</NavLink>
          <NavLink className='option-button' to= "/clientes">Clientes</NavLink>
          <NavLink className='option-button'>Catálogo</NavLink>
          <NavLink className='option-button'>Configuración</NavLink>
        </div>
        <div className="menubox">
          <div className='menu-superior'>
            <div className='cotizatitlecontainer'>
              <h3 className='cotizatitle'>Cotizaciones</h3>
            </div>
            <div>
              <button className='reporte'>Reporte</button>
              <button className='nc'>+ Nueva Cotización</button>
            </div>
          </div>
          <div className="menu-matriz">
            <div className="filtros">
              <input className="filtros-box" placeholder="ID" value={searchTerm.id} onChange={(e) => setSearchTerm({...searchTerm, id: e.target.value})} />
              <input className="filtros-box" placeholder="Fecha" value={searchTerm.fecha} onChange={(e) => setSearchTerm({...searchTerm, fecha: e.target.value})} />
              <input className="filtros-box" placeholder="Vendedor" value={searchTerm.vendedor} onChange={(e) => setSearchTerm({...searchTerm, vendedor: e.target.value})} />
              <input className="filtros-box" placeholder="Estado" value={searchTerm.estado} onChange={(e) => setSearchTerm({...searchTerm, estado: e.target.value})} />
              <input className="filtros-box" placeholder="Cliente" value={searchTerm.cliente} onChange={(e) => setSearchTerm({...searchTerm, cliente: e.target.value})} />
            </div>
            <div className='matriz'>
              <table className='table'>
                <thead className='table-thead'>
                  <tr className='table-tr'>
                    <th className='table-header'>ID</th>
                    <th className='table-header'>Fecha</th>
                    <th className='table-header'>Vendedor</th>
                    <th className='table-header'>Estado</th>
                    <th className='table-header'>Cliente</th>
                    <th className='table-header-total'>Total</th>
                  </tr>
                </thead>
                <tbody className='table'>
                  {filteredCotizaciones.length > 0 ? filteredCotizaciones.map((cotizacion, index) => (
                    <tr key={index} className='table-trdatos'>
                      <td className='table-datos'>{cotizacion.id}</td>
                      <td className='table-datos'>{cotizacion.fecha}</td>
                      <td className='table-datos'>{cotizacion.vendedor}</td>
                      <td className="table-datos" style={{ color: getColor(cotizacion.estado) }}>
                        {cotizacion.estado}
                      </td>
                      <td className='table-datos'>{cotizacion.cliente}</td>
                      <td className='table-datostotal'>
                        {cotizacion.total}
                        <div className='crud-icons'>   
                          <i className="bi bi-eye-fill"></i>  
                          <i className="bi bi-pencil-fill" onClick={() => setCotizacionAEditar(cotizacion)}></i>
                          <i className="bi bi-file-earmark-arrow-down-fill"></i>
                          <i className="bi bi-trash3-fill" onClick={() => setCotizacionAEliminar(cotizacion)}></i>                  
                        </div> 
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6">No se encontraron cotizaciones.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {cotizacionAEliminar && (
          <MensajeAlerta
            tipo="eliminar"
            mensaje={`¿Seguro que querés eliminar la cotización con ID ${cotizacionAEliminar.id}?`}
            onConfirmar={confirmarEliminacion}
            onCancelar={() => setCotizacionAEliminar(null)}
          />
        )}

        {cotizacionAEditar && (
          <MensajeAlerta
            tipo="editar"
            mensaje={`Editando cotización con ID: ${cotizacionAEditar.id}`}
            cotizacion={cotizacionAEditar}
            onConfirmar={confirmarEdicion}
            onCancelar={() => setCotizacionAEditar(null)}
          />
        )}

        {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
      </div>
    </>
  );
};

export default Menu;





