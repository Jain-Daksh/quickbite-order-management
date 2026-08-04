import { Op } from 'sequelize';

import { MenuItem } from '../models';

export class MenuService {
  static async getAllMenu() {
    const menu = await MenuItem.findAll({
      where: {
        is_available: true,
      },
      order: [['created_at', 'DESC']],
    });

    return menu;
  }

  static async getMenuById(id: string) {
    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    return menuItem;
  }

  static async getMenuByCategory(category: string) {
    const menu = await MenuItem.findAll({
      where: {
        category: {
          [Op.iLike]: category,
        },
        is_available: true,
      },

      order: [['created_at', 'DESC']],
    });

    return menu;
  }
}
