import MenuItem from '../MenuItem';
import OrderItem from '../OrderItem';

export const setupMenuItemAssociation = () => {
  MenuItem.hasMany(OrderItem, {
    foreignKey: 'menu_item_id',
    as: 'orderItems',
  });
};
