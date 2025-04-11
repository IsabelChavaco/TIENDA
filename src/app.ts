import express from 'express';
import config from './config';
import productosRoutes from './routes/productos.routes';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prefijo para las rutas
app.use('/api/auth', authRoutes); 
app.use('/api/productos', productosRoutes); 

export default app;

