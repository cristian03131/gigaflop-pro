import * as cotizacionesModel from '../models/CotizacionesModels.js';

export const listarCotizaciones = async (req, res) => {
  try {
    const datos = await cotizacionesModel.listarCotizaciones();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearCotizacion = async (req, res) => {
  try {
    const nuevoId = await cotizacionesModel.crearCotizacion(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCotizacionPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cotizaciones = await cotizacionesModel.listarCotizaciones();
    const cotizacion = cotizaciones.find(c => c.id === id);
    
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }
    res.status(200).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarCotizacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await cotizacionesModel.actualizarCotizacion(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }
    res.status(200).json({ message: 'Cotización actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarCotizacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await cotizacionesModel.eliminarCotizacion(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }
    res.status(200).json({ message: 'Cotización eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
