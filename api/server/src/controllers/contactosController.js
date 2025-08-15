import * as contactosModel from '../models/ContactosModels.js';

export const listarContactos = async (req, res) => {
  try {
    const datos = await contactosModel.listarContactos();
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearContacto = async (req, res) => {
  try {
    const nuevoId = await contactosModel.crearContacto(req.body);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerContactoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contactos = await contactosModel.listarContactos();
    const contacto = contactos.find(c => c.id === id);

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarContacto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasActualizadas = await contactosModel.actualizarContacto(id, req.body);
    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    res.status(200).json({ message: 'Contacto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarContacto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filasEliminadas = await contactosModel.eliminarContacto(id);
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    res.status(200).json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
