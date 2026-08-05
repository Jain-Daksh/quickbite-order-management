import { Server } from 'socket.io';

let io: Server;

export const setSocketIO = (socket: Server) => {
  io = socket;
};

export const getSocketIO = () => {
  return io;
};
