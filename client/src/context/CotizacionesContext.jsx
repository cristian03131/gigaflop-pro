import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CotizacionesContext = createContext();

export const CotizacionesProvider = ({ children }) => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [detallesCotizaciones, setDetallesCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial de cotizaciones y detalles
  const fetchCotizacionesData = async () => {
    setLoading(true);
    try {
      const { data: cotizacionesData, error: cotizacionesError } = await supabase.from('cotizaciones').select('*');
      const { data: detallesData, error: detallesError } = await supabase.from('detalles_cotizaciones').select('*');

      if (cotizacionesError || detallesError) {
        throw new Error('Error cargando datos de cotizaciones');
      }

      setCotizaciones(cotizacionesData);
      setDetallesCotizaciones(detallesData);
    } catch (error) {
      console.error(error);
      setCotizaciones([]);
      setDetallesCotizaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotizacionesData();
  }, []);

  // Función para eliminar cotización por id
  const eliminarCotizacion = async (id) => {
    try {
      const { error } = await supabase.from('cotizaciones').delete().eq('id', id);
      if (error) throw error;
      setCotizaciones(prev => prev.filter(c => c.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar cotización:', error);
      return { success: false, error };
    }
  };

  // Función para editar cotización dados id y datos nuevos
  const editarCotizacion = async (id, datosActualizados) => {
    try {
      const { error } = await supabase
        .from('cotizaciones')
        .update(datosActualizados)
        .eq('id', id);

      if (error) throw error;

      setCotizaciones(prev =>
        prev.map(c => c.id === id ? { ...c, ...datosActualizados } : c)
      );

      return { success: true };
    } catch (error) {
      console.error('Error al editar cotización:', error);
      return { success: false, error };
    }
  };

  return (
    <CotizacionesContext.Provider value={{
      cotizaciones,
      detallesCotizaciones,
      loading,
      eliminarCotizacion,
      editarCotizacion,
      fetchCotizacionesData,
    }}>
      {children}
    </CotizacionesContext.Provider>
  );
};

export const useCotizaciones = () => useContext(CotizacionesContext);

