import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useClientes } from '../context/ClientesContext';
import Sidebar from '../components/Sidebar';
import Register from '../components/Register';
import MensajeAlerta from '../components/MensajeAlerta';
import '../CSS/menu.css';

const Clientes = () => {
  const { clientes, loading, eliminarCliente, editarCliente } = useClientes();

  const [busqueda, setBusqueda] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [clienteAEditar, setClienteAEditar] = useState(null);

  // Filtrado local simple por razón social
  const clientesFiltrados = clientes.filter(c =>
    c.razon_social.toLowerCase().includes(busqueda.toLowerCase())
  );

  const confirmarEliminacion = async () => {
    if (!clienteAEliminar) return;
    const resultado = await eliminarCliente(clienteAEliminar.cuit);
    if (!resultado.success) {
      setMensajeError('No se pudo eliminar el cliente');
    }
    setClienteAEliminar(null);
  };

  const confirmarEdicion = async (e, nuevaRazonSocial, nuevoCuit) => {
    e.preventDefault();
    if (!clienteAEditar) return;

    const resultado = await editarCliente(clienteAEditar.cuit, {
      razon_social: nuevaRazonSocial,
      cuit: nuevoCuit,
    });

    if (!resultado.success) {
      setMensajeError('Error al actualizar cliente');
    }
    setClienteAEditar(null);
  };

  return (
    <>
      <Sidebar />
      <div className="background-container-menu">
        <header className="header">
          <div className="container-header">
            <div className="title-container">
              <h2 className="title-menu">GIGAFLOP</h2>
            </div>
          </div>
          <div className="container-icon">
            <label htmlFor="btn-menu">
              <i className="bi bi-person-circle custom-icon"></i>
            </label>
          </div>
        </header>

        <div className="option">
          <NavLink className="option-button" to="/menu">Cotizaciones</NavLink>
          <NavLink className="option-button2">Clientes</NavLink>
          <NavLink className="option-button">Catálogo</NavLink>
          <NavLink className="option-button">Configuración</NavLink>
        </div>

        {showRegisterForm && (
          <div className="register-modal-overlay" onClick={() => setShowRegisterForm(false)}>
            <div className="register-modal-content" onClick={(e) => e.stopPropagation()}>
              <Register onClose={() => setShowRegisterForm(false)} />
            </div>
          </div>
        )}

        <div className="menubox">
          <div className="menu-superior">
            <div className="cotizatitlecontainer">
              <h3 className="cotizatitle">Clientes</h3>
            </div>
            <div>
              <button className="reporte">Reporte</button>
              <button className="nc" onClick={() => setShowRegisterForm(true)}>+ Nuevo Cliente</button>
            </div>
          </div>

          <div className="menu-matriz">
            <div className="filtros">
              <input
                className="buscador"
                placeholder="Buscar por Razón Social"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className='botonlimpiar' onClick={() => { setBusqueda(''); setMensajeError(''); }}>Limpiar</button>
              {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
            </div>

            <div className="matriz">
              <table className="table">
                <thead className="table-thead">
                  <tr className="table-tr">
                    <th className="table-header">ID</th>
                    <th className="table-header">Razón Social</th>
                    <th className="table-header">CUIT</th>
                    <th className="table-header">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {loading ? (
                    <tr><td colSpan="4">Cargando clientes...</td></tr>
                  ) : clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map((cliente, index) => (
                      <tr key={index} className="table-trdatos">
                        <td className="table-datos">{cliente.id}</td>
                        <td className="table-datos">{cliente.razon_social}</td>
                        <td className="table-datos">{cliente.cuit}</td>
                        <td className="table-datostotal">
                          <div className="crud-icons">
                            <i className="bi bi-pencil-fill" onClick={() => setClienteAEditar(cliente)}></i>
                            <i className="bi bi-trash3-fill" onClick={() => setClienteAEliminar(cliente)}></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">No se encontraron clientes.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {clienteAEliminar && (
          <MensajeAlerta
            tipo="eliminar"
            mensaje={`¿Seguro que querés eliminar a ${clienteAEliminar.razon_social}?`}
            onConfirmar={confirmarEliminacion}
            onCancelar={() => setClienteAEliminar(null)}
          />
        )}

        {clienteAEditar && (
          <MensajeAlerta
            tipo="editar"
            mensaje={`Editando cliente: ${clienteAEditar.razon_social}`}
            cliente={clienteAEditar}
            onConfirmar={confirmarEdicion}
            onCancelar={() => setClienteAEditar(null)}
          />
        )}
      </div>
    </>
  );
};

export default Clientes;
