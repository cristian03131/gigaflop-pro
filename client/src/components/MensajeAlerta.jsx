import React, { useState, useEffect } from 'react';

const MensajeAlerta = ({
  tipo, // 'eliminar' o 'editar'
  mensaje,
  onConfirmar,
  onCancelar,
  cotizacion, // datos iniciales para editar
}) => {
  const [formData, setFormData] = useState({
    fecha: '',
    vendedor: '',
    estado: '',
    cliente: '',
    total: ''
  });

  useEffect(() => {
    if (tipo === 'editar' && cotizacion) {
      setFormData({
        fecha: cotizacion.fecha || '',
        vendedor: cotizacion.vendedor || '',
        estado: cotizacion.estado || '',
        cliente: cotizacion.cliente || '',
        total: cotizacion.total || ''
      });
    }
  }, [cotizacion, tipo]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmar(e, formData);
  };

  if (tipo === 'eliminar') {
    return (
      <div className="modal-overlay" onClick={onCancelar}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <p>{mensaje}</p>
          <div className="buttons">
            <button onClick={onConfirmar}>Confirmar</button>
            <button onClick={onCancelar}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  if (tipo === 'editar') {
    return (
      <div className="modal-overlay" onClick={onCancelar}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3>{mensaje}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Fecha:
              <input
                type="text"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Vendedor:
              <input
                type="text"
                name="vendedor"
                value={formData.vendedor}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Estado:
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Cliente:
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Total:
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                required
              />
            </label>
            <div className="buttons">
              <button type="submit">Guardar</button>
              <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default MensajeAlerta;
