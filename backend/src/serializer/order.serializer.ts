export const show = async (order: any) => {
  return {
    order_number: order.order_number,

    customer_name: order.customer_name,

    phone: order.phone,

    address: order.address,

    status: order.status,

    total_amount: Number(order.total_amount),

    items:
      order.items?.map((item: any) => ({
        menu_item_id: item.menu_item_id,

        name: item.menuItem?.name,

        image: item.menuItem?.image_url,

        category: item.menuItem?.category,

        quantity: item.quantity,

        price: Number(item.price),

        subtotal: Number(item.subtotal),
      })) || [],

    created_at: order.created_at,
  };
};

export default {
  show,
};
