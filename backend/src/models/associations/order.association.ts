import Order from '../Order';
import OrderItem from '../OrderItem';

export const setupOrderAssociation = () => {
  Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'items',
    onDelete: 'CASCADE',
  });
};
