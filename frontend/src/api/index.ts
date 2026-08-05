import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: 'https://quickbite-order-management-raftlabs.onrender.com/api', //import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export * from './menu.api';
export * from './order.api';
export * from './cart.api';
