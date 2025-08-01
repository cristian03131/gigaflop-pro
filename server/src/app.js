import dotenv from 'dotenv';
dotenv.config(); // sólo para desarrollo local

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import usuariosRoutes from './routes/usuariosRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

app.use(errorHandler);
const app = express();

// Obtener __dirname en entorno ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura CORS con URL explícita de frontend, no '*'
app.use(cors({
  origin: process.env.FRONTEND_URL,  // por ejemplo: 'https://gigaflop-pro.vercel.app'
  credentials: true,
}));

// Pre-configurar OPTIONS para CORS
app.options('*', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Middleware comunes
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api", menuRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api", productosRoutes);

// Servir archivos estáticos desde la carpeta build de React 
app.use(express.static(path.join(__dirname, '../../client/build')));

// Para cualquier ruta que no sea API, servir index.html para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Middleware manejo de errores general
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});



export default app;
