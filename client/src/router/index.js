import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Menu from "../pages/Menu.jsx";
import Clientes from "../pages/Clientes.jsx";
import RutaProtegida from '../components/RutaProtegida.jsx';
import Home from "../pages/Home.jsx";


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
]);



// { basename: '/gigaflop-pp3-app-react' });
