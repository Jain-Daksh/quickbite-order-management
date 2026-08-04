import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export enum OrderStatus {
  ORDER_RECEIVED = 'ORDER_RECEIVED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
}

interface OrderAttributes {
  id: string;
  order_number?: string;
  customer_name: string;
  phone: string;
  address: string;
  status: OrderStatus;
  total_amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  declare id: string;
  declare customer_name: string;
  declare order_number?: string;
  declare phone: string;
  declare address: string;
  declare status: OrderStatus;
  declare total_amount: number;

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
        order_number: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        customer_name: {
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

        total_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );

    return Order;
  }
}

export default Order;
