import React, { useState } from 'react';
import '../CSS/register.css';
import axios from 'axios';

const Register = ({ onClose }) => {
  const [razonSocial, setRazonSocial] = useState('');
  const [cuit, setCuit] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'exito' o 'error'

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  // Validación básica de CUIT (solo números y guiones permitidos, longitud típica)
  const validarCuit = (valor) => {
    const cuitRegex = /^[0-9-]{11,13}$/;
    return cuitRegex.test(valor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCuit(cuit)) {
      setMensaje('CUIT no válido. Debe contener solo números y guiones.');
      setTipoMensaje('error');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/clientes`, {
        razon_social: razonSocial,
        cuit: cuit,
      });
      setMensaje(res.data.mensaje || 'Cliente registrado con éxito');
      setTipoMensaje('exito');
      setRazonSocial('');
      setCuit('');
      // Podés llamar a onClose() acá si querés cerrar tras éxito
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
              maxLength={13}
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
