import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.js';
import { UserProvider } from './context/UserContext.jsx';
import { CotizacionesProvider } from './context/CotizacionesContext.jsx';
import { ClientesProvider } from './context/ClientesContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx'; // Importá el nuevo contexto

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CotizacionesProvider>
        <ClientesProvider>
          <ProductosProvider>
            <RouterProvider router={router} />
          </ProductosProvider>
        </ClientesProvider>
      </CotizacionesProvider>
    </UserProvider>
  </React.StrictMode>
);






