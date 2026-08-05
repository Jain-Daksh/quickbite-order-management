import { MenuItem } from '../models';

export class CartService {
  static async getCartItems(
    items: { menu_item_id: string; quantity: number }[],
  ) {
    const ids = items.map((item) => item.menu_item_id);

    const products = await MenuItem.findAll({
      where: {
        id: ids,
        is_available: true,
      },
      attributes: ['id', 'name', 'price', 'image_url'],
    });

    const cartItems = products.map((product: any) => {
      const cartItem = items.find((item) => item.menu_item_id === product.id);

      const price = Number(product.price);
      const quantity = cartItem?.quantity || 0;

      return {
        productId: product.id,
        name: product.name,
        image_url: product.image_url,
        price,
        quantity,
        itemTotal: price * quantity,
      };
    });

    return {
      items: cartItems,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cartItems.reduce((sum, item) => sum + item.itemTotal, 0),
    };
  }
}
