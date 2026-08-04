import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface MenuItemAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
}

interface MenuItemCreationAttributes extends Optional<
  MenuItemAttributes,
  'id'
> {}

class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare price: number;
  declare image_url: string;
  declare category: string;
  declare is_available: boolean;

  static initModel(sequelize: Sequelize) {
    MenuItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },

        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        is_available: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'menu_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );

    return MenuItem;
  }
}

export default MenuItem;
