import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export enum OrderStatus {
  ORDER_RECEIVED = 'ORDER_RECEIVED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
}

interface OrderAttributes {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  declare id: string;
  declare customerName: string;
  declare phone: string;
  declare address: string;
  declare status: OrderStatus;
  declare totalAmount: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        customerName: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        status: {
          type: DataTypes.ENUM(...Object.values(OrderStatus)),
          defaultValue: OrderStatus.ORDER_RECEIVED,
        },

        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
      },
    );

    return Order;
  }
}

export default Order;
