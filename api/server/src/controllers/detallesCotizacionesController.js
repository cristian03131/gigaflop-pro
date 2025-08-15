import * as detallesCotizacionesModel from '../models/detallesCotizacionesModels.js';

export const listarDetallesCotizaciones = async (req, res) => {
  try {
    const datos = await detallesCotizacionesModel.listarDetallesCotizaciones();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearDetalleCotizacion = async (req, res) => {
  try {
    const nuevoId = await detallesCotizacionesModel.crearDetalleCotizacion(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDetalleCotizacionPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const detalles = await detallesCotizacionesModel.listarDetallesCotizaciones();
    const detalle = detalles.find(d => d.id === id);

    if (!detalle) {
      return res.status(404).json({ message: 'Detalle de cotización no encontrado' });
    }
    res.status(200).json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarDetalleCotizacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await detallesCotizacionesModel.actualizarDetalleCotizacion(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Detalle de cotización no encontrado' });
    }
    res.status(200).json({ message: 'Detalle de cotización actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarDetalleCotizacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await detallesCotizacionesModel.eliminarDetalleCotizacion(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Detalle de cotización no encontrado' });
    }
    res.status(200).json({ message: 'Detalle de cotización eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
