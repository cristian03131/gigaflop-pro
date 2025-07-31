import dotenv from 'dotenv';
dotenv.config(); // Sólo necesario para desarrollo local

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import usuariosRoutes from './routes/usuariosRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import productosRoutes from './routes/productosRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Configura CORS para permitir sólo tu frontend (ejemplo)
app.use(cors({
  origin: process.env.FRONTEND_URL, // URL de tu frontend
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api", menuRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api", productosRoutes);

// Configura el path para servir archivos estáticos del frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Si decides servir frontend desde acá (no obligatorio en Vercel)
// Asegúrate que la ruta y carpeta tenga sentido para funciones serverless.
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Para cualquier ruta que no sea API, devuelve el index.html para soporte SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

export default app;