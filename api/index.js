import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del archivo .env al inicio

import app from './server/src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
