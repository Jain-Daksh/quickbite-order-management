import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface OrderItemAttributes {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  'id'
> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  declare id: string;
  declare order_id: string;
  declare menu_item_id: string;
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

        order_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },

        menu_item_id: {
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
        tableName: 'order_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );

    return OrderItem;
  }
}

export default OrderItem;
