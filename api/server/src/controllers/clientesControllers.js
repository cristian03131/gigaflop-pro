import { crearCliente, listarClientes,actualizarCliente, eliminarCliente } from "../models/ClientesModels.js";

// Controlador para crear cliente pasando razon_social y cuit
export const crearClienteController = async (req, res) => {
  const { razon_social, cuit } = req.body;

  try {
    const insertId = await crearCliente({ razon_social, cuit });
    res.status(201).json({ mensaje: "Cliente creado con éxito!", id: insertId });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: "No se pudo crear el cliente" });
  }
};

// Controlador para listar a todos los clientes
export const listarClientesController = async (req, res) => {
  try {
    const clientes = await listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ mensaje: "Error al obtener clientes" });
  }
};

// Controlador para listar un cliente por razon_social
export const listarClienteController = async (req, res) => {
  const { razon_social } = req.query;

  try {
    const clientes = await listarCliente({ razon_social });
    if (!clientes.length) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error en búsqueda por razón social:', error);
    res.status(500).json({ error: 'Error al buscar cliente' });
  }
};

// Controlador para actualizar un cliente por cuit - modificamos razon_social  
export const actualizarClienteController = async (req, res) => {
  const { cuit } = req.params;
  const { razon_social } = req.body;

  try {
    const filasAfectadas = await actualizarCliente(cuit, { razon_social });
    if (filasAfectadas === 0) {
      return res.status(404).json({ error: "Cliente no encontrado o sin cambios" });
    }
    res.status(200).json({ mensaje: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "No se pudo actualizar el cliente" });
  }
};

// Controlador para eliminar un cliente por cuit
export const eliminarClienteController = async (req, res) => {
  const { cuit } = req.params;

  try {
    const filasAfectadas = await eliminarCliente(cuit);
    if (filasAfectadas === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json({ mensaje: "Cliente eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "No se pudo eliminar el cliente" });
  }
};
