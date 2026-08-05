import api from './index';

interface OrderItem {
  menu_item_id: string;
  quantity: number;
}

interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  items: OrderItem[];
}

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await api.post('/orders', data);
  return response.data;
};

export const getOrderById = async (data: { id: number; phone: string }) => {
  const response = await api.post('/orders/get', data);
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string | number,
  status: string,
) => {
  const response = await api.patch(`/orders/${orderId}/status`, {
    status,
  });

  return response.data;
};
