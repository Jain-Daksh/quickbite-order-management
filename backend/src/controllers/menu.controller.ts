import { Request, Response } from 'express';

import { MenuService } from '../service/menu.service';
import { Success, Failed } from '../utils/api.service';

export class MenuController {
  static async getAllMenu(_req: Request, res: Response) {
    try {
      const menu = await MenuService.getAllMenu();

      return Success(res, 'Menu fetched successfully', menu);
    } catch (err: any) {
      return Failed(res, err.message || 'Failed to fetch menu', 400, err);
    }
  }

  static async getMenuById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const menu = await MenuService.getMenuById(id as string);

      return Success(res, 'Menu item fetched successfully', menu);
    } catch (err: any) {
      return Failed(res, err.message || 'Failed to fetch menu item', 400, err);
    }
  }

  static async getMenuByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;

      const menu = await MenuService.getMenuByCategory(category as string);

      return Success(res, 'Menu filtered successfully', menu);
    } catch (err: any) {
      return Failed(res, err.message || 'Failed to filter menu', 400, err);
    }
  }
}
