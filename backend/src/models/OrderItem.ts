import { Model, DataTypes, Optional, Sequelize } from "sequelize";


interface OrderItemAttributes {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}


interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}


class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  declare id: string;
  declare orderId: string;
  declare menuItemId: string;
  declare quantity: number;
  declare price: number;
  declare subtotal: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;


  static initModel(sequelize: Sequelize) {
    OrderItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },

        menuItemId: {
          type: DataTypes.UUID,
          allowNull: false,
        },

        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },

        subtotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "order_items",
        timestamps: true,
      }
    );

    return OrderItem;
  }
}


export default OrderItem;