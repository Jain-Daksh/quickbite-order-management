import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export * from './menu.api';
export * from './order.api';
export * from './cart.api';
