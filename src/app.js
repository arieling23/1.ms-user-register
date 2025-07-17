require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/database'); 
const { connectRabbitMQ } = require('./events/publisher');



const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://54.225.75.133:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// CORS Middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(204);
  }
  next();
});

// Rutas
app.use('/api/users', userRoutes);

// Conexiones
async function startServer() {
  try {
    await connectDB();             
    await connectRabbitMQ();       

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://54.156.172.190:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err.message);
    process.exit(1);
  }
}

startServer();
