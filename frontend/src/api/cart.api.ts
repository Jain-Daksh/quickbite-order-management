import api from './index';

export const getCartItems = async (
  items: { menu_item_id: string; quantity: number }[],
) => {
  return api.post('/cart', {
    items,
  });
};
