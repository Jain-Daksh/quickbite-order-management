import { Sequelize } from "sequelize";

import MenuItem from "./MenuItem";
import Order from "./Order";
import OrderItem from "./OrderItem";

import { initializeAssociations } from "./associations";


export function initModels(sequelize: Sequelize) {
  // Initialize models
  MenuItem.initModel(sequelize);
  Order.initModel(sequelize);
  OrderItem.initModel(sequelize);

  // Initialize relationships
  initializeAssociations();

  return {
    MenuItem,
    Order,
    OrderItem,
  };
}


export {
  MenuItem,
  Order,
  OrderItem,
};