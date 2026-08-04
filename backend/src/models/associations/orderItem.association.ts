import OrderItem from "../OrderItem";
import Order from "../Order";
import MenuItem from "../MenuItem";

export const setupOrderItemAssociation = () => {
  OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
  });

  OrderItem.belongsTo(MenuItem, {
    foreignKey: "menuItemId",
    as: "menuItem",
  });
};