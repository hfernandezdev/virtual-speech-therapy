import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import studentRoutes from './routes/students';
import sessionRoutes from './routes/sessions';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/sessions', sessionRoutes);


// Conexión MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/speech-therapy';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// Rutas básicas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Speech Therapy API running' });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
