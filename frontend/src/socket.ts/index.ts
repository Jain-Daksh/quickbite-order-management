import { io } from 'socket.io-client';

export const socket = io('https://quickbite-order-management-raftlabs.onrender.com', {
  transports: ['websocket'],
});
