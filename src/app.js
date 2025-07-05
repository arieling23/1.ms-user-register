require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/database'); 
const { connectRabbitMQ } = require('./events/publisher');



const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000', // donde corre tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.options(/^\/api\/.*$/, cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/', userRoutes);

// Conexiones
async function startServer() {
  try {
    await connectDB();             
    await connectRabbitMQ();       

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err.message);
    process.exit(1);
  }
}

startServer();
