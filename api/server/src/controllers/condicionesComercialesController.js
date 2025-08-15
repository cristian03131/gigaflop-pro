import * as condicionesComercialesModel from '../models/CondicionesComercialesModels.js';

export const listarCondicionesComerciales = async (req, res) => {
  try {
    const datos = await condicionesComercialesModel.listarCondicionesComerciales();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearCondicionComercial = async (req, res) => {
  try {
    const nuevoId = await condicionesComercialesModel.crearCondicionComercial(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCondicionComercialPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const condiciones = await condicionesComercialesModel.listarCondicionesComerciales();
    const condicion = condiciones.find(c => c.id === id);

    if (!condicion) {
      return res.status(404).json({ message: 'Condición comercial no encontrada' });
    }
    res.status(200).json(condicion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarCondicionComercial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await condicionesComercialesModel.actualizarCondicionComercial(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Condición comercial no encontrada' });
    }
    res.status(200).json({ message: 'Condición comercial actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarCondicionComercial = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await condicionesComercialesModel.eliminarCondicionComercial(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Condición comercial no encontrada' });
    }
    res.status(200).json({ message: 'Condición comercial eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
