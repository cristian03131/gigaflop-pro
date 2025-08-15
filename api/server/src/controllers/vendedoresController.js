import * as vendedoresModel from '../models/VendedoresModels.js';

export const listarVendedores = async (req, res) => {
  try {
    const datos = await vendedoresModel.listarVendedores();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearVendedor = async (req, res) => {
  try {
    const nuevoId = await vendedoresModel.crearVendedor(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerVendedorPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vendedores = await vendedoresModel.listarVendedores();
    const vendedor = vendedores.find(v => v.id === id);

    if (!vendedor) {
      return res.status(404).json({ message: 'Vendedor no encontrado' });
    }
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarVendedor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await vendedoresModel.actualizarVendedor(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Vendedor no encontrado' });
    }
    res.status(200).json({ message: 'Vendedor actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarVendedor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await vendedoresModel.eliminarVendedor(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Vendedor no encontrado' });
    }
    res.status(200).json({ message: 'Vendedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
