import { Sequelize, Model, DataTypes, Optional } from "sequelize";


interface MenuItemAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
}


interface MenuItemCreationAttributes
  extends Optional<MenuItemAttributes, "id"> {}


class MenuItem
  extends Model<MenuItemAttributes, MenuItemCreationAttributes>
{

  declare id: string;
  declare name: string;
  declare description: string;
  declare price: number;
  declare imageUrl: string;
  declare category: string;
  declare isAvailable: boolean;


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
          type: DataTypes.DECIMAL(10,2),
          allowNull: false,
        },

        imageUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        isAvailable: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: "menu_items",
        timestamps: true,
      }
    );

    return MenuItem;
  }
}


export default MenuItem;