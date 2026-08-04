import { Request, Response } from 'express';
import { OrderService } from '../service/order.service';
import { Success, Failed } from '../utils/api.service';
import { createOrderSchema } from '../validations/order.validation';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const validatedOrderData = createOrderSchema.parse(req.body);
      const order = await OrderService.createOrder(validatedOrderData);
      return Success(res, 'Order placed successfully', order);
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return Failed(
          res,
          err.issues.map((issue: any) => issue.message).join(', '),
          400,
          null,
        );
      }

      return Failed(res, err.message || 'Failed to place order', 400, err);
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const { id, phone } = req.body;
      const order = await OrderService.getOrderById(String(id), String(phone));

      return Success(res, 'Order fetched successfully', order);
    } catch (err: any) {
      return Failed(res, err.message || 'Failed to fetch order', 400, err);
    }
  }

  static async updateOrderStatus(req: Request, res: Response) {
    try {
      const { status, id } = req.body;

      const order = await OrderService.updateOrderStatus(id, status);

      return Success(res, 'Order status updated successfully', order);
    } catch (err: any) {
      return Failed(
        res,
        err.message || 'Failed to update order status',
        400,
        err,
      );
    }
  }
}
