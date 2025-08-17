import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Menu from "../pages/Menu.jsx";
import Clientes from "../pages/Clientes.jsx";
import RutaProtegida from '../components/RutaProtegida.jsx';
import Home from "../pages/Home.jsx";
import Registrarse from "../pages/Registrarse.jsx";
import NotFound from "../pages/NotFound.jsx"; // Importa NotFound

export const router = createBrowserRouter([

  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registro',
    element: <Registrarse />,
  },
  {
    element: <RutaProtegida />, // rutas protegidas
    children: [
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/clientes',
        element: <Clientes />,
      },
    ],
  },
  {
    path: '*',          // Ruta catch-all para 404
    element: <NotFound />,
  },
]);



// { basename: '/gigaflop-pp3-app-react' });
