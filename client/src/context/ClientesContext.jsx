import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [condicionesComerciales, setCondicionesComerciales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos
  const fetchClientesData = async () => {
    setLoading(true);
    try {
      const { data: clientesData, error: clientesError } = await supabase.from('clientes').select('*');
      const { data: direccionesData, error: direccionesError } = await supabase.from('direcciones_clientes').select('*');
      const { data: contactosData, error: contactosError } = await supabase.from('contactos').select('*');
      const { data: condicionesData, error: condicionesError } = await supabase.from('condiciones_comerciales').select('*');

      if (clientesError || direccionesError || contactosError || condicionesError) {
        throw new Error('Error cargando datos de clientes');
      }

      setClientes(clientesData);
      setDirecciones(direccionesData);
      setContactos(contactosData);
      setCondicionesComerciales(condicionesData);
    } catch (error) {
      console.error(error);
      setClientes([]);
      setDirecciones([]);
      setContactos([]);
      setCondicionesComerciales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientesData();
  }, []);

  // Función para eliminar un cliente
  const eliminarCliente = async (cuit) => {
    try {
      const { error } = await supabase.from('clientes').delete().eq('cuit', cuit);
      if (error) throw error;
      // Actualizo estado local
      setClientes(prev => prev.filter(c => c.cuit !== cuit));
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      return { success: false, error };
    }
  };

  // Función para editar un cliente
  const editarCliente = async (cuitAntiguo, datosActualizados) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update(datosActualizados)
        .eq('cuit', cuitAntiguo);

      if (error) throw error;

      // Actualizo estado local
      setClientes(prev =>
        prev.map(c =>
          c.cuit === cuitAntiguo ? { ...c, ...datosActualizados } : c
        )
      );

      return { success: true };
    } catch (error) {
      console.error('Error al editar cliente:', error);
      return { success: false, error };
    }
  };

  return (
    <ClientesContext.Provider value={{
      clientes,
      direcciones,
      contactos,
      condicionesComerciales,
      loading,
      eliminarCliente,
      editarCliente,
      fetchClientesData
    }}>
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => useContext(ClientesContext);

