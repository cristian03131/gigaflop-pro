import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [tarifasEnvio, setTarifasEnvio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductosData = async () => {
      setLoading(true);
      try {
        const { data: productosData, error: productosError } = await supabase.from('productos').select('*');
        const { data: tarifasData, error: tarifasError } = await supabase.from('tarifas_envio').select('*');

        if (productosError || tarifasError) {
          throw new Error('Error cargando datos de productos');
        }

        setProductos(productosData);
        setTarifasEnvio(tarifasData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductosData();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, tarifasEnvio, loading }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);
