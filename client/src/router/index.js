import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Clientes from "../pages/Clientes";
import RutaProtegida from '../components/RutaProtegida';


export const router = createBrowserRouter([

      {
    path: '/',
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
