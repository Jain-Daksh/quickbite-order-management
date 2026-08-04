import Order from "../Order";
import OrderItem from "../OrderItem";

export const setupOrderAssociation = () => {
  Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
    onDelete: "CASCADE",
  });
};