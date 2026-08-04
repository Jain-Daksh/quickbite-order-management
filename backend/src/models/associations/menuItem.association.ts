import MenuItem from '../MenuItem';
import OrderItem from '../OrderItem';

export const setupMenuItemAssociation = () => {
  MenuItem.hasMany(OrderItem, {
    foreignKey: 'menuItemId',
    as: 'orderItems',
  });
};
