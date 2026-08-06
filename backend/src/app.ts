import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { setSocketIO } from './socket';
import { sequelize } from './config';
import { initModels } from './models';
import router from './routes';

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'https://quickbite-order-management-nine.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  },
});

setSocketIO(io);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join-order', (orderId: string) => {
    socket.join(`order-${orderId}`);

    console.log(`${socket.id} joined order-${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.use(
  cors({
    origin: [
      'https://quickbite-order-management-nine.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

initModels(sequelize);

const PORT = Number(process.env.PORT) || 5000;

export default app;
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
