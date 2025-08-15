import * as direccionesClientesModel from '../models/DireccionesClientesModels.js';

export const listarDireccionesClientes = async (req, res) => {
  try {
    const datos = await direccionesClientesModel.listarDireccionesClientes();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearDireccionCliente = async (req, res) => {
  try {
    const nuevoId = await direccionesClientesModel.crearDireccionCliente(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDireccionClientePorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const direcciones = await direccionesClientesModel.listarDireccionesClientes();
    const direccion = direcciones.find(d => d.id === id);

    if (!direccion) {
      return res.status(404).json({ message: 'Dirección cliente no encontrada' });
    }
    res.status(200).json(direccion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarDireccionCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await direccionesClientesModel.actualizarDireccionCliente(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Dirección cliente no encontrada' });
    }
    res.status(200).json({ message: 'Dirección cliente actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarDireccionCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await direccionesClientesModel.eliminarDireccionCliente(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Dirección cliente no encontrada' });
    }
    res.status(200).json({ message: 'Dirección cliente eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
