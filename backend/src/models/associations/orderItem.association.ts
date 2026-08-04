import OrderItem from '../OrderItem';
import Order from '../Order';
import MenuItem from '../MenuItem';

export const setupOrderItemAssociation = () => {
  OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order',
  });

  OrderItem.belongsTo(MenuItem, {
    foreignKey: 'menu_item_id',
    as: 'menuItem',
  });
};
