import React, { useState } from 'react';
import '../CSS/register.css';
import axios from 'axios';

const Register = ({ onClose }) => {
  const [razonSocial, setRazonSocial] = useState('');
  const [cuit, setCuit] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'exito' o 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/clientes', {
        razon_social: razonSocial,
        cuit: cuit,
      });
      setMensaje(res.data.mensaje || 'Cliente registrado con éxito');
      setTipoMensaje('exito');
      setRazonSocial('');
      setCuit('');
      // No cierres inmediatamente si querés mostrar el mensaje primero
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      setMensaje("No se pudo registrar el cliente");
      setTipoMensaje('error');
    }
  };

  return (
    <div>
      <input type="checkbox" id="btn-register-cliente" />
      <div className="container-nuevo-cliente">
        <form className="form-container" onSubmit={handleSubmit}>
          <label className="close-register-cliente" htmlFor="btn-register-cliente" onClick={onClose}>✖️</label>
          <h1 className="register-title">Nuevo Cliente</h1>

          <div className="form">
            <label className="form-label" htmlFor="razon_social">Razón Social:</label>
            <input
              className="form-input"
              type="text"
              id="razon_social"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              required
            />
          </div>

          <div className="form">
            <label className="form-label" htmlFor="cuit">C.U.I.T:</label>
            <input
              className="form-input"
              type="text"
              id="cuit"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              required
            />
          </div>

          <button className="form-button" type="submit">Registrar Cliente</button>

          {mensaje && (
            <p className={`mensaje-registro ${tipoMensaje === 'error' ? 'mensaje-error' : 'mensaje-exito'}`}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;