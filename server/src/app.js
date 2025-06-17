import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usuariosRoutes from './routes/usuariosRoutes.js';
import menuRoutes from "./routes/menuRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Cambia si tu frontend está en otra URL
    credentials: true
}));

//esto es para que el servidor pueda recibir cookies
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use("/api/usuarios", usuariosRoutes);
app.use("/api", menuRoutes);
app.use("/api/clientes", clientesRoutes);


export default app;