import * as tarifasEnvioModel from '../models/tarifasEnvioModels.js';

export const listarTarifasEnvio = async (req, res) => {
  try {
    const datos = await tarifasEnvioModel.listarTarifasEnvio();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearTarifaEnvio = async (req, res) => {
  try {
    const nuevoId = await tarifasEnvioModel.crearTarifaEnvio(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTarifaEnvioPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tarifas = await tarifasEnvioModel.listarTarifasEnvio();
    const tarifa = tarifas.find(t => t.id === id);

    if (!tarifa) {
      return res.status(404).json({ message: 'Tarifa de envío no encontrada' });
    }
    res.status(200).json(tarifa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarTarifaEnvio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await tarifasEnvioModel.actualizarTarifaEnvio(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Tarifa de envío no encontrada' });
    }
    res.status(200).json({ message: 'Tarifa de envío actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarTarifaEnvio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await tarifasEnvioModel.eliminarTarifaEnvio(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Tarifa de envío no encontrada' });
    }
    res.status(200).json({ message: 'Tarifa de envío eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
