import { Request, Response } from 'express';

import { CartService } from '../service/cart.service';
import { Success, Failed } from '../utils/api.service';

export class CartController {
  static async getCart(req: Request, res: Response) {
    try {
      const { items } = req.body;

      const cart = await CartService.getCartItems(items);

      return Success(res, 'Cart fetched successfully', cart);
    } catch (err: any) {
      return Failed(res, err.message || 'Failed to fetch cart', 400, err);
    }
  }
}
