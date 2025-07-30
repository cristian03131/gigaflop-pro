import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usuariosRoutes from './routes/usuariosRoutes.js';
import menuRoutes from "./routes/menuRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import productosRoutes from './routes/productosRoutes.js'; // Importa las rutas de productos
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


//esto es para que el servidor pueda recibir cookies
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use("/api/usuarios", usuariosRoutes);
app.use("/api", menuRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api", productosRoutes); // Usa las rutas de productos

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});


export default app;